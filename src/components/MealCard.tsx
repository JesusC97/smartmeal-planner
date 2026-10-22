import React from 'react';
import { Recipe, MealType, DayOfWeek } from '../types';
import { Plus, ArrowRightLeft, Trash2, Home, Sparkles } from 'lucide-react';

interface MealCardProps {
  day: DayOfWeek;
  mealType: MealType;
  recipe: Recipe | null;
  onSelectMeal: (day: DayOfWeek, mealType: MealType) => void;
  onClearMeal: (day: DayOfWeek, mealType: MealType) => void;
  onNavigateToPantry?: () => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  legumbre: { bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-800 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-800' },
  pescado: { bg: 'bg-cyan-50 dark:bg-cyan-950/40', text: 'text-cyan-800 dark:text-cyan-300', border: 'border-cyan-200 dark:border-cyan-800' },
  carne: { bg: 'bg-rose-50 dark:bg-rose-950/40', text: 'text-rose-800 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-800' },
  verdura: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-800 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-800' },
  pasta: { bg: 'bg-orange-50 dark:bg-orange-950/40', text: 'text-orange-800 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-800' },
  arroz: { bg: 'bg-yellow-50 dark:bg-yellow-950/40', text: 'text-yellow-800 dark:text-yellow-300', border: 'border-yellow-200 dark:border-yellow-800' },
  huevos: { bg: 'bg-indigo-50 dark:bg-indigo-950/40', text: 'text-indigo-800 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-800' },
  sopa: { bg: 'bg-teal-50 dark:bg-teal-950/40', text: 'text-teal-800 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-800' },
  libre: { bg: 'bg-purple-50 dark:bg-purple-950/50', text: 'text-purple-800 dark:text-purple-200', border: 'border-purple-300 dark:border-purple-700' },
};

export const MealCard: React.FC<MealCardProps> = ({
  day,
  mealType,
  recipe,
  onSelectMeal,
  onClearMeal,
  onNavigateToPantry,
}) => {
  const isLunch = mealType === 'almuerzo';
  const label = isLunch ? 'Almuerzo' : 'Cena';

  if (!recipe) {
    return (
      <div className="flex flex-col h-full bg-slate-50/70 dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-3 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 transition group">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            {isLunch ? '☀️ ' + label : '🌙 ' + label}
          </span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">Sin plato</span>
        </div>

        <button
          onClick={() => onSelectMeal(day, mealType)}
          className="flex-1 flex flex-col items-center justify-center py-4 px-2 rounded-lg bg-white/70 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 shadow-2xs transition min-h-[58px]"
          aria-label={`Asignar plato para el ${day} - ${label}`}
        >
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-700 dark:text-emerald-300 mb-1.5 group-hover:scale-110 transition">
            <Plus className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">Asignar {label}</span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Elegir o Plato Libre</span>
        </button>
      </div>
    );
  }

  const isFreeMeal = recipe.category === 'libre' || recipe.id === 'plato-libre';

  const categoryStyle = CATEGORY_COLORS[recipe.category] || {
    bg: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-800 dark:text-slate-200',
    border: 'border-slate-200 dark:border-slate-700',
  };

  return (
    <div
      className={`flex flex-col h-full rounded-xl border shadow-2xs hover:shadow-md transition-all overflow-hidden group ${
        isFreeMeal
          ? 'bg-purple-50/30 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/80 hover:border-purple-400'
          : 'bg-white dark:bg-slate-800 border-slate-200/90 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
      }`}
    >
      {/* Header pill */}
      <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
        <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          {isLunch ? '☀️ ' + label : '🌙 ' + label}
        </span>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border} uppercase tracking-wider`}
        >
          {isFreeMeal ? '🍽️ LIBRE' : recipe.category}
        </span>
      </div>

      {/* Main Info: Clean dish title */}
      <div
        onClick={() => {
          if (isFreeMeal && onNavigateToPantry) {
            onNavigateToPantry();
          }
        }}
        className={`px-3 py-2 flex-1 flex flex-col justify-center ${
          isFreeMeal ? 'cursor-pointer hover:bg-purple-50/50 dark:hover:bg-purple-900/20 transition' : ''
        }`}
      >
        <h4
          className={`text-xs sm:text-sm font-bold line-clamp-2 leading-snug transition ${
            isFreeMeal
              ? 'text-purple-900 dark:text-purple-200 hover:text-purple-700 flex items-center gap-1.5'
              : 'text-slate-900 dark:text-white'
          }`}
          title={recipe.name}
        >
          {recipe.name}
        </h4>

        {isFreeMeal && (
          <p className="text-[11px] text-purple-700 dark:text-purple-300 mt-1 flex items-center gap-1 font-medium">
            <Home className="w-3 h-3" />
            <span>Toca para ver qué tienes en la despensa</span>
          </p>
        )}
      </div>

      {/* Action Buttons bar (Ultra-clean: NO "Ver plato", only direct actions) */}
      <div className="px-2.5 py-2 bg-slate-50/80 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-1.5">
        {isFreeMeal ? (
          <button
            onClick={() => onNavigateToPantry && onNavigateToPantry()}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-md bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/60 dark:hover:bg-purple-800/80 text-purple-900 dark:text-purple-200 text-[11px] font-bold shadow-2xs min-h-[36px] transition"
            title="Ir a la despensa para ver qué cocinar"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Ver Despensa</span>
          </button>
        ) : (
          <button
            onClick={() => onSelectMeal(day, mealType)}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-md bg-white dark:bg-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 text-[11px] font-semibold border border-slate-200 dark:border-slate-600 shadow-2xs min-h-[36px] transition"
            title="Cambiar este plato por otro"
            aria-label={`Cambiar plato para ${day} ${label}`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Cambiar</span>
          </button>
        )}

        <button
          onClick={() => onClearMeal(day, mealType)}
          className="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition min-h-[36px] min-w-[36px] flex items-center justify-center"
          title="Quitar plato"
          aria-label={`Quitar ${recipe.name} de ${day} ${label}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
