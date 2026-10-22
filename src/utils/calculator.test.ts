import test from 'node:test';
import assert from 'node:assert/strict';
import {
  consolidateIngredients,
  calculateBasketComparison,
  formatCurrency,
  getMealPlanNutritionStats,
} from './calculator';
import { DEFAULT_RECIPES } from '../data/defaultRecipes';
import { WeeklyPlan } from '../types';

test('consolidateIngredients merges duplicate items across different meals and days', () => {
  const emptyPlan: WeeklyPlan = {
    lunes: { almuerzo: null, cena: null },
    martes: { almuerzo: null, cena: null },
    miercoles: { almuerzo: null, cena: null },
    jueves: { almuerzo: null, cena: null },
    viernes: { almuerzo: null, cena: null },
    sabado: { almuerzo: null, cena: null },
    domingo: { almuerzo: null, cena: null },
  };

  // Assign Tortilla de patatas to Lunes almuerzo (4 patatas, 6 huevos, 1 cebolla)
  // and Pollo al horno to Lunes cena (3 patatas, 1 cebolla, 4 pechugas)
  emptyPlan.lunes.almuerzo = DEFAULT_RECIPES[1]; // Tortilla
  emptyPlan.lunes.cena = DEFAULT_RECIPES[3];     // Pollo al horno

  const result = consolidateIngredients(emptyPlan);

  // Patatas: 4 + 3 = 7
  const patatas = result.find((item) => item.name.toLowerCase().includes('patatas'));
  assert.ok(patatas, 'Patatas should be in the list');
  assert.equal(patatas.amount, 7);
  assert.equal(patatas.sourceRecipes?.length, 2);

  // Cebolla: 1 + 1 = 2
  const cebolla = result.find((item) => item.name.toLowerCase().includes('cebolla'));
  assert.ok(cebolla, 'Cebolla should be in the list');
  assert.equal(cebolla.amount, 2);
});

test('calculateBasketComparison computes single-store totals and price difference', () => {
  const testItems = [
    {
      id: 'item-1',
      name: 'Lentejas pardinas',
      amount: 350,
      unit: 'g',
      category: 'legumbres' as const,
      inPantry: false,
    },
    {
      id: 'item-2',
      name: 'Salmón fresco',
      amount: 2,
      unit: 'ud',
      category: 'pescados' as const,
      inPantry: false,
    },
    {
      id: 'item-3',
      name: 'Sal fina',
      amount: 1,
      unit: 'cda',
      category: 'despensa' as const,
      inPantry: true, // In pantry, should be excluded from basket total!
    },
  ];

  const customLinks = {
    'lentejas pardinas': {
      alcampoUrl: 'https://www.alcampo.es/compra-online/producto/lentejas-custom',
    },
  };

  const comparison = calculateBasketComparison(testItems, customLinks);

  // Total should only include item-1 and item-2
  assert.equal(comparison.items.length, 2, 'Should exclude items in pantry');
  assert.ok(comparison.totalAlcampo > 0);
  assert.ok(comparison.totalCarrefour > 0);
  assert.ok(['alcampo', 'carrefour', 'empate'].includes(comparison.cheaperSupermarket));
  assert.ok(comparison.differenceAmount >= 0);

  // Custom link check
  const lentejaItem = comparison.items.find((i) => i.ingredient.name === 'Lentejas pardinas');
  assert.equal(
    lentejaItem?.alcampoUrl,
    'https://www.alcampo.es/compra-online/producto/lentejas-custom'
  );
});

test('formatCurrency formats euros properly in Spanish format', () => {
  const formatted = formatCurrency(12.5);
  assert.ok(formatted.includes('12,50') || formatted.includes('12.50'));
  assert.ok(formatted.includes('€'));
});

test('getMealPlanNutritionStats calculates planned meal count', () => {
  const emptyPlan: WeeklyPlan = {
    lunes: { almuerzo: DEFAULT_RECIPES[0], cena: null },
    martes: { almuerzo: null, cena: DEFAULT_RECIPES[1] },
    miercoles: { almuerzo: null, cena: null },
    jueves: { almuerzo: null, cena: null },
    viernes: { almuerzo: null, cena: null },
    sabado: { almuerzo: null, cena: null },
    domingo: { almuerzo: null, cena: null },
  };

  const stats = getMealPlanNutritionStats(emptyPlan);
  assert.equal(stats.totalMeals, 14);
  assert.equal(stats.mealsPlanned, 2);
  assert.equal(stats.completionPercentage, Math.round((2 / 14) * 100));
});
