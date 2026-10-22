import React, { useState } from 'react';
import { Recipe, DayOfWeek, MealType } from '../types';
import {
  X,
  Search,
  ChefHat,
  Plus,
  Check,
  Home,
  Sparkles,
} from 'lucide-react';
import { capitalize } from '../utils/calculator';
import { FREE_MEAL_RECIPE } from '../data/defaultRecipes';

interface RecipeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: DayOfWeek | null;
  mealType: MealType | null;
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onOpenCreateRecipe: () => void;
}

export const RecipeSelectorModal: React.FC<RecipeSelectorModalProps> = ({
  isOpen,
  onClose,
  day,
  mealType,
  recipes,
  onSelectRecipe,
  onOpenCreateRecipe,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen || !day || !mealType) return null;

  const categories = [
    { key: 'all', label: 'Todos' },
    { key: 'legumbre', label: 'Legumbres' },
    { key: 'pescado', label: 'Pescados' },
    { key: 'carne', label: 'Carnes' },
    { key: 'verdura', label: 'Verduras' },
    { key: 'pasta', label: 'Pasta' },
    { key: 'arroz', label: 'Arroces' },
    { key: 'huevos', label: 'Huevos' },
    { key: 'sopa', label: 'Sopas y Cremas' },
  ];

  const filteredRecipes = recipes.filter((r) => {
    if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = r.name.toLowerCase().includes(q);
      const matchTag = r.tags.some((t) => t.toLowerCase().includes(q));
      const matchIng = r.ingredients.some((i) => i.name.toLowerCase().includes(q));
      if (!matchName && !matchTag && !matchIng) return false;
    }
    return true;
  });

  const mealLabel = mealType === 'almuerzo' ? 'Almuerzo' : 'Cena';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="p-4 sm:px-6 sm:py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              Asignar plato para el {capitalize(day)} ({mealLabel})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Elige una receta, crea un plato propio o asigna una comida libre.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Cerrar ventana de selección de plato"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Option 1: Asignar Plato Libre Banner */}
        <div className="p-3 sm:px-6 py-2.5 bg-purple-50/80 dark:bg-purple-950/30 border-b border-purple-100 dark:border-purple-800/60">
          <div
            onClick={() => {
              onSelectRecipe(FREE_MEAL_RECIPE);
              onClose();
            }}
            className="p-3 rounded-xl border border-purple-300 dark:border-purple-700 bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition cursor-pointer flex items-center justify-between gap-3 shadow-2xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                🍽️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-purple-950 dark:text-purple-200">
                    Asignar Plato Libre (Ver Despensa)
                  </h4>
                  <span className="text-[10px] font-extrabold uppercase bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded-full">
                    Flexibilidad
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No añade ingredientes a la compra. Al pulsar en la semana te llevará a tu despensa para improvisar.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="px-3.5 py-1.5 rounded-lg bg-purple-600 text-white font-bold text-xs shadow-2xs group-hover:bg-purple-700 transition shrink-0"
            >
              Elegir Libre
            </button>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="p-3 sm:p-4 border-b border-slate-100 dark:border-slate-700 space-y-3 bg-white dark:bg-slate-800">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Buscar plato o ingrediente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
              />
            </div>
            <button
              onClick={onOpenCreateRecipe}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition min-h-[44px] shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Plato</span>
            </button>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition min-h-[36px] ${
                  selectedCategory === c.key
                    ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3">
          {filteredRecipes.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <ChefHat className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="font-semibold text-slate-600 dark:text-slate-300">No se encontraron recetas</p>
              <p className="text-xs text-slate-400 mt-1">Prueba con otro término o crea una receta nueva.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => {
                    onSelectRecipe(recipe);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition cursor-pointer bg-white dark:bg-slate-800 flex flex-col justify-between group active:scale-[0.99]"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        {recipe.category}
                      </span>
                      <span className="text-slate-400 dark:text-slate-500">{recipe.difficulty}</span>
                    </div>

                    <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-emerald-600 transition leading-snug">
                      {recipe.name}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                      {recipe.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500">
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline flex items-center gap-0.5 ml-auto">
                      <span>Seleccionar plato</span>
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
