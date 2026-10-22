import {
  BasketComparison,
  DayOfWeek,
  IngredientCategory,
  IngredientItem,
  WeeklyPlan,
  ProductCustomLinksMap,
} from '../types';
import { findSupermarketPrice } from '../data/supermarketPrices';

/**
 * Normalizes an ingredient name for grouping.
 */
export function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

/**
 * Aggregates all ingredients from the weekly plan (lunch + dinner) and optional custom items.
 * Merges items with the same name and compatible units.
 */
export function consolidateIngredients(
  weeklyPlan: WeeklyPlan,
  extraItems: IngredientItem[] = [],
  servingsFactor: number = 1
): IngredientItem[] {
  const map = new Map<string, IngredientItem>();

  const days: DayOfWeek[] = [
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado',
    'domingo',
  ];

  days.forEach((day) => {
    const dayPlan = weeklyPlan[day];
    if (!dayPlan) return;

    const meals = [
      { meal: dayPlan.almuerzo, label: `${capitalize(day)} (Almuerzo)` },
      { meal: dayPlan.cena, label: `${capitalize(day)} (Cena)` },
    ];

    meals.forEach(({ meal }) => {
      if (!meal) return;
      const recipeMultiplier = servingsFactor;

      meal.ingredients.forEach((ing) => {
        const key = `${normalizeName(ing.name)}_${normalizeName(ing.unit)}`;
        const scaledAmount = Number((ing.amount * recipeMultiplier).toFixed(2));

        if (map.has(key)) {
          const existing = map.get(key)!;
          existing.amount = Number((existing.amount + scaledAmount).toFixed(2));
          if (meal.name && !existing.sourceRecipes?.includes(meal.name)) {
            existing.sourceRecipes = [...(existing.sourceRecipes || []), meal.name];
          }
        } else {
          map.set(key, {
            id: `ing-${key}-${Math.random().toString(36).slice(2, 7)}`,
            name: ing.name,
            amount: scaledAmount,
            unit: ing.unit,
            category: ing.category,
            inPantry: false,
            checked: false,
            sourceRecipes: [meal.name],
          });
        }
      });
    });
  });

  // Merge extra items
  extraItems.forEach((extra) => {
    const key = `${normalizeName(extra.name)}_${normalizeName(extra.unit)}`;
    if (map.has(key)) {
      const existing = map.get(key)!;
      existing.amount = Number((existing.amount + extra.amount).toFixed(2));
      existing.custom = true;
    } else {
      map.set(key, { ...extra });
    }
  });

  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name, 'es'));
}

/**
 * Calculates price comparison between Alcampo and Carrefour for the shopping list.
 * Evaluates the full basket in Alcampo vs the full basket in Carrefour.
 * Excludes items marked as inPantry (already in home pantry).
 */
export function calculateBasketComparison(
  items: IngredientItem[],
  customLinks: ProductCustomLinksMap = {}
): BasketComparison {
  // Only items needed to buy (not in pantry)
  const toBuy = items.filter((item) => !item.inPantry);

  let totalAlcampo = 0;
  let totalCarrefour = 0;

  const comparisonItems = toBuy.map((ingredient) => {
    const priceInfo = findSupermarketPrice(ingredient.name, ingredient.category);
    const key = ingredient.name.toLowerCase().trim();
    const custom = customLinks[key];

    const priceAlcampo = priceInfo.alcampo.price;
    const priceCarrefour = priceInfo.carrefour.price;

    totalAlcampo += priceAlcampo;
    totalCarrefour += priceCarrefour;

    let cheaperStore: 'alcampo' | 'carrefour' | 'empate' = 'empate';
    if (priceAlcampo < priceCarrefour) {
      cheaperStore = 'alcampo';
    } else if (priceCarrefour < priceAlcampo) {
      cheaperStore = 'carrefour';
    }

    const itemSavings = Number(Math.abs(priceAlcampo - priceCarrefour).toFixed(2));

    const alcampoUrl = custom?.alcampoUrl || priceInfo.alcampo.url;
    const carrefourUrl = custom?.carrefourUrl || priceInfo.carrefour.url;

    return {
      ingredient,
      priceInfo,
      calculatedPriceAlcampo: priceAlcampo,
      calculatedPriceCarrefour: priceCarrefour,
      cheaperStore,
      itemSavings,
      alcampoUrl,
      carrefourUrl,
    };
  });

  totalAlcampo = Number(totalAlcampo.toFixed(2));
  totalCarrefour = Number(totalCarrefour.toFixed(2));

  let cheaperSupermarket: 'alcampo' | 'carrefour' | 'empate' = 'empate';
  if (totalAlcampo < totalCarrefour) {
    cheaperSupermarket = 'alcampo';
  } else if (totalCarrefour < totalAlcampo) {
    cheaperSupermarket = 'carrefour';
  }

  const differenceAmount = Number(Math.abs(totalAlcampo - totalCarrefour).toFixed(2));
  const maxTotal = Math.max(totalAlcampo, totalCarrefour);
  const differencePercentage =
    maxTotal > 0 ? Number(((differenceAmount / maxTotal) * 100).toFixed(1)) : 0;

  return {
    totalAlcampo,
    totalCarrefour,
    cheaperSupermarket,
    differenceAmount,
    differencePercentage,
    items: comparisonItems,
  };
}

/**
 * Helper to capitalize first letter.
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format currency in EUR standard.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Returns summary stats for nutritional balance of the weekly plan.
 */
export function getMealPlanNutritionStats(weeklyPlan: WeeklyPlan) {
  const days: DayOfWeek[] = [
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado',
    'domingo',
  ];

  let mealsPlanned = 0;
  const categories: Record<string, number> = {
    pescado: 0,
    legumbre: 0,
    carne: 0,
    verdura: 0,
    pasta: 0,
    arroz: 0,
    huevos: 0,
    sopa: 0,
  };

  days.forEach((day) => {
    const dp = weeklyPlan[day];
    if (dp.almuerzo) {
      mealsPlanned++;
      categories[dp.almuerzo.category] = (categories[dp.almuerzo.category] || 0) + 1;
    }
    if (dp.cena) {
      mealsPlanned++;
      categories[dp.cena.category] = (categories[dp.cena.category] || 0) + 1;
    }
  });

  return {
    totalMeals: 14,
    mealsPlanned,
    categories,
    completionPercentage: Math.round((mealsPlanned / 14) * 100),
  };
}
