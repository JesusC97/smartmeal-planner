import React, { useState } from 'react';
import { Recipe } from '../types';
import {
  ChefHat,
  Plus,
  Search,
  Clock,
  Eye,
  Trash2,
  Sparkles,
} from 'lucide-react';

interface RecipeLibraryProps {
  recipes: Recipe[];
  onViewRecipe: (recipe: Recipe) => void;
  onOpenCreateRecipe: () => void;
  onDeleteRecipe?: (id: string) => void;
}

export const RecipeLibrary: React.FC<RecipeLibraryProps> = ({
  recipes,
  onViewRecipe,
  onOpenCreateRecipe,
  onDeleteRecipe,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'Todos los platos' },
    { key: 'legumbre', label: 'Legumbres' },
    { key: 'pescado', label: 'Pescados' },
    { key: 'carne', label: 'Carnes' },
    { key: 'verdura', label: 'Verduras' },
    { key: 'pasta', label: 'Pastas' },
    { key: 'arroz', label: 'Arroces' },
    { key: 'huevos', label: 'Huevos' },
    { key: 'sopa', label: 'Sopas y Cremas' },
  ];

  const filtered = recipes.filter((r) => {
    if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = r.name.toLowerCase().includes(q);
      const matchIng = r.ingredients.some((i) => i.name.toLowerCase().includes(q));
      if (!matchName && !matchIng) return false;
    }
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Recetario y Platos
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              {recipes.length} platos disponibles
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Cada plato incluye su lista de ingredientes para sumarse automáticamente a la cesta semanal y a la comparativa de Alcampo y Carrefour.
          </p>
        </div>

        <button
          onClick={onOpenCreateRecipe}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition active:scale-95 min-h-[44px] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Plato Propio</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Buscar por plato o ingrediente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
          />
        </div>

        {/* Categories scrollable */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setSelectedCategory(c.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition min-h-[36px] ${
                selectedCategory === c.key
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-md hover:border-emerald-300 transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  {recipe.category}
                </span>
                <span className="text-slate-400 font-medium">
                  {recipe.prepTimeMinutes} min • {recipe.difficulty}
                </span>
              </div>

              <h3
                onClick={() => onViewRecipe(recipe)}
                className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition cursor-pointer leading-snug"
              >
                {recipe.name}
              </h3>

              <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
                {recipe.description}
              </p>

              {/* Ingredients tag cloud preview */}
              <div className="mt-3 flex flex-wrap gap-1">
                {recipe.ingredients.slice(0, 4).map((ing, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md text-[10px] bg-slate-100 text-slate-700 font-medium"
                  >
                    {ing.name}
                  </span>
                ))}
                {recipe.ingredients.length > 4 && (
                  <span className="px-1.5 py-0.5 rounded-md text-[10px] text-slate-400">
                    +{recipe.ingredients.length - 4} más
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onViewRecipe(recipe)}
                className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-800"
              >
                <Eye className="w-4 h-4" />
                <span>Ver receta e ingredientes</span>
              </button>

              {recipe.id.startsWith('custom-') && onDeleteRecipe && (
                <button
                  onClick={() => onDeleteRecipe(recipe.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg min-h-[36px] min-w-[36px] flex items-center justify-center"
                  title="Eliminar plato personalizado"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
