import React, { useState } from 'react';
import { IngredientItem } from '../types';
import {
  Home,
  CheckCircle2,
  Plus,
  Sparkles,
  Utensils,
  Lightbulb,
  Search,
  Check,
  Calendar,
} from 'lucide-react';

interface PantryViewProps {
  items: IngredientItem[];
  pantryMap: Record<string, boolean>;
  onTogglePantryByName: (name: string) => void;
  onNavigateToPlanner: () => void;
}

const COMMON_PANTRY_STAPLES = [
  'Aceite de oliva virgen extra',
  'Sal fina',
  'Pimentón dulce',
  'Dientes de ajo',
  'Cebolla',
  'Huevos camperos L',
  'Arroz redondo',
  'Espaguetis de trigo',
  'Tomate frito casero',
  'Atún en aceite de oliva',
  'Garbanzos cocidos en tarro',
  'Patatas',
  'Pan de hogaza',
  'Queso parmesano rallado',
  'Leche',
  'Café',
];

const PANTRY_RECIPE_IDEAS = [
  {
    title: 'Tortilla de patatas o francesa',
    ingredients: ['Huevos', 'Patatas', 'Cebolla', 'Aceite'],
    desc: 'Un clásico infalible en 20 minutos con básicos de despensa.',
  },
  {
    title: 'Arroz salteado con atún y huevo a la plancha',
    ingredients: ['Arroz redondo', 'Atún en aceite', 'Huevos', 'Ajo'],
    desc: 'Comida rápida, saciante y nutritiva en 15 minutos.',
  },
  {
    title: 'Pasta al ajo, aceite y pimentón',
    ingredients: ['Espaguetis', 'Ajo', 'Aceite de oliva', 'Pimentón dulce'],
    desc: 'Plato italiano clásico "Aglio e Olio", listo en 10 minutos.',
  },
  {
    title: 'Garbanzos salteados al pimentón con cebolla pochada',
    ingredients: ['Garbanzos en tarro', 'Cebolla', 'Pimentón', 'Aceite'],
    desc: 'Alto en proteína y fibra, aprovechando legumbre ya cocida.',
  },
  {
    title: 'Pisto rápido o revuelto de despensa',
    ingredients: ['Huevos', 'Tomate frito', 'Cebolla'],
    desc: 'Cena ligera y reconfortante para una noche libre.',
  },
];

export const PantryView: React.FC<PantryViewProps> = ({
  items,
  pantryMap,
  onTogglePantryByName,
  onNavigateToPlanner,
}) => {
  const [search, setSearch] = useState('');
  const [newStapleInput, setNewStapleInput] = useState('');

  // Collect all known items: those in weekly plan + common staples
  const allKnownNames = Array.from(
    new Set([...COMMON_PANTRY_STAPLES, ...items.map((i) => i.name)])
  ).sort((a, b) => a.localeCompare(b, 'es'));

  const filteredNames = allKnownNames.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const pantryCount = Object.values(pantryMap).filter(Boolean).length;

  const handleAddCustomStaple = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStapleInput.trim()) return;
    onTogglePantryByName(newStapleInput.trim());
    setNewStapleInput('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5 shadow-xs transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-purple-700 dark:text-purple-300">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Mi Despensa (Tengo en Casa)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Aquí tienes el inventario de lo que ya tienes en casa. Los productos marcados no se comprarán ni sumarán coste.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 text-xs font-bold border border-purple-200 dark:border-purple-800">
              {pantryCount} productos en casa
            </span>
            <button
              onClick={onNavigateToPlanner}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 text-white hover:bg-slate-800 text-xs sm:text-sm font-semibold transition min-h-[44px]"
            >
              <Calendar className="w-4 h-4" />
              <span>Volver a la Semana</span>
            </button>
          </div>
        </div>

        {/* Ideas for "Plato Libre" Callout */}
        <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-slate-800 border border-purple-200 dark:border-purple-800/80">
          <div className="flex items-center gap-2 mb-2 text-purple-900 dark:text-purple-200 font-bold text-sm">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>¿Tienes un Plato Libre hoy? Ideas rápidas para improvisar con lo de casa:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 mt-2">
            {PANTRY_RECIPE_IDEAS.map((idea, idx) => (
              <div
                key={idx}
                className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-lg border border-purple-100 dark:border-slate-700 text-xs space-y-1"
              >
                <div className="font-bold text-slate-900 dark:text-white">{idea.title}</div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{idea.desc}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {idea.ingredients.map((ing, i) => {
                    const haveIt = !!pantryMap[ing.toLowerCase().trim()];
                    return (
                      <span
                        key={i}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          haveIt
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {haveIt ? '✓ ' : ''}{ing}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Add to Pantry Toolbar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 transition-colors">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Buscar producto de despensa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[44px]"
          />
        </div>

        <form onSubmit={handleAddCustomStaple} className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Añadir alimento que tienes..."
            value={newStapleInput}
            onChange={(e) => setNewStapleInput(e.target.value)}
            className="flex-1 sm:w-64 px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl text-xs sm:text-sm min-h-[44px]"
          />
          <button
            type="submit"
            className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs min-h-[44px] shrink-0"
          >
            Añadir
          </button>
        </form>
      </div>

      {/* Pantry Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredNames.map((name) => {
          const key = name.toLowerCase().trim();
          const isInPantry = !!pantryMap[key];

          return (
            <div
              key={name}
              onClick={() => onTogglePantryByName(name)}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-2.5 transition cursor-pointer select-none ${
                isInPantry
                  ? 'bg-purple-50/80 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800 text-purple-950 dark:text-purple-100 shadow-2xs'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition shrink-0 ${
                    isInPantry
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700'
                  }`}
                >
                  {isInPantry && <Check className="w-3.5 h-3.5" />}
                </div>

                <span className="font-semibold text-xs sm:text-sm truncate">
                  {name}
                </span>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  isInPantry
                    ? 'bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-200'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}
              >
                {isInPantry ? 'En casa' : 'No tengo'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
