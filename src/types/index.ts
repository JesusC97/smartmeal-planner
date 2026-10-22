export type DayOfWeek = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';

export type MealType = 'almuerzo' | 'cena';

export type IngredientCategory =
  | 'verduras'
  | 'carnes'
  | 'pescados'
  | 'lacteos'
  | 'legumbres'
  | 'despensa'
  | 'panaderia'
  | 'frutas'
  | 'otros';

export interface IngredientItem {
  id: string;
  name: string;
  amount: number;
  unit: string; // 'g', 'kg', 'ml', 'l', 'ud', 'diente', 'cda', etc.
  category: IngredientCategory;
  inPantry?: boolean; // if user already has it at home
  checked?: boolean;  // if already bought
  custom?: boolean;   // if added manually to the shopping list
  sourceRecipes?: string[]; // recipes that require this item
}

export type ActiveTab = 'planner' | 'shopping' | 'pantry' | 'comparator' | 'recipes';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: 'carne' | 'pescado' | 'legumbre' | 'verdura' | 'pasta' | 'arroz' | 'huevos' | 'sopa' | 'libre';
  prepTimeMinutes: number;
  difficulty: 'Fácil' | 'Media' | 'Difícil';
  servings: number; // default base servings
  tags: string[];
  imagePlaceholder?: string;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
    category: IngredientCategory;
  }[];
  instructions?: string[];
}

export type DayPlan = {
  almuerzo: Recipe | null;
  cena: Recipe | null;
};

export type WeeklyPlan = Record<DayOfWeek, DayPlan>;

export interface SupermarketPriceInfo {
  query: string;
  productName: string;
  category: IngredientCategory;
  alcampo: {
    price: number;
    unitPrice: string;
    brand: string;
    packSize: string;
    url: string;
    inStock: boolean;
  };
  carrefour: {
    price: number;
    unitPrice: string;
    brand: string;
    packSize: string;
    url: string;
    inStock: boolean;
  };
  cheaperStore: 'alcampo' | 'carrefour' | 'empate';
  savings: number; // positive difference between the higher and lower price
}

export interface CustomProductLink {
  alcampoUrl?: string;
  carrefourUrl?: string;
  notes?: string;
}

export type ProductCustomLinksMap = Record<string, CustomProductLink>;

export interface BasketComparison {
  totalAlcampo: number;
  totalCarrefour: number;
  cheaperSupermarket: 'alcampo' | 'carrefour' | 'empate';
  differenceAmount: number; // difference between full basket in Alcampo vs Carrefour
  differencePercentage: number;
  items: {
    ingredient: IngredientItem;
    priceInfo: SupermarketPriceInfo;
    calculatedPriceAlcampo: number;
    calculatedPriceCarrefour: number;
    cheaperStore: 'alcampo' | 'carrefour' | 'empate';
    itemSavings: number;
    alcampoUrl: string;
    carrefourUrl: string;
  }[];
}
