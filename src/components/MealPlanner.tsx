import React, { useState } from 'react';
import {
  WeeklyPlan,
  DayOfWeek,
  MealType,
  Recipe,
} from '../types';
import { MealCard } from './MealCard';
import {
  Sparkles,
  Trash2,
  ShoppingCart,
  Store,
  UtensilsCrossed,
  CheckCircle2,
  Fish,
  Flame,
  Leaf,
  Beef,
  Egg,
  Home,
} from 'lucide-react';
import { getMealPlanNutritionStats } from '../utils/calculator';

interface MealPlannerProps {
  weeklyPlan: WeeklyPlan;
  onSelectMealSlot: (day: DayOfWeek, mealType: MealType) => void;
  onClearMealSlot: (day: DayOfWeek, mealType: MealType) => void;
  onClearEntireWeek: () => void;
  onAutoGenerateBalancedMenu: () => void;
  onNavigateToShopping: () => void;
  onNavigateToComparator: () => void;
  onNavigateToPantry: () => void;
}

const DAYS: { key: DayOfWeek; label: string; short: string }[] = [
  { key: 'lunes', label: 'Lunes', short: 'Lun' },
  { key: 'martes', label: 'Martes', short: 'Mar' },
  { key: 'miercoles', label: 'Miércoles', short: 'Mié' },
  { key: 'jueves', label: 'Jueves', short: 'Jue' },
  { key: 'viernes', label: 'Viernes', short: 'Vie' },
  { key: 'sabado', label: 'Sábado', short: 'Sáb' },
  { key: 'domingo', label: 'Domingo', short: 'Dom' },
];

export const MealPlanner: React.FC<MealPlannerProps> = ({
  weeklyPlan,
  onSelectMealSlot,
  onClearMealSlot,
  onClearEntireWeek,
  onAutoGenerateBalancedMenu,
  onNavigateToShopping,
  onNavigateToComparator,
  onNavigateToPantry,
}) => {
  const [selectedDayFilter, setSelectedDayFilter] = useState<'all' | DayOfWeek>('all');

  const stats = getMealPlanNutritionStats(weeklyPlan);

  const displayedDays =
    selectedDayFilter === 'all'
      ? DAYS
      : DAYS.filter((d) => d.key === selectedDayFilter);

  return (
    <div className="space-y-5">
      {/* Top Banner: Quick Summary & Action Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5 shadow-xs transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Planificador Semanal
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                {stats.mealsPlanned}/14 comidas asignadas
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Asigna almuerzo y cena para cada día. Puedes elegir platos o marcar comidas libres para cocinar con la despensa.
            </p>
          </div>

          {/* Quick Actions (Large touch targets for tablet) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onAutoGenerateBalancedMenu}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition active:scale-95 min-h-[44px]"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Menú Equilibrado</span>
            </button>

            <button
              onClick={onNavigateToPantry}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-800 text-xs sm:text-sm font-semibold transition active:scale-95 min-h-[44px]"
            >
              <Home className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Ver Despensa</span>
            </button>

            <button
              onClick={onNavigateToShopping}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition active:scale-95 min-h-[44px]"
            >
              <ShoppingCart className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Lista Compra</span>
            </button>

            <button
              onClick={onNavigateToComparator}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm font-semibold transition active:scale-95 min-h-[44px]"
            >
              <Store className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Alcampo vs Carrefour</span>
            </button>

            <button
              onClick={onClearEntireWeek}
              className="p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Vaciar toda la semana"
              aria-label="Vaciar todo el menú semanal"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Nutritional Balance Indicator Pills */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
            <UtensilsCrossed className="w-3.5 h-3.5 text-slate-400" />
            Equilibrio:
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 font-medium">
            <Fish className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            Pescado: <strong>{stats.categories.pescado || 0}</strong>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-medium">
            <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            Legumbres: <strong>{stats.categories.legumbre || 0}</strong>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium">
            <Leaf className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Verduras: <strong>{(stats.categories.verdura || 0) + (stats.categories.sopa || 0)}</strong>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-medium">
            <Beef className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            Carnes: <strong>{stats.categories.carne || 0}</strong>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-medium">
            <Egg className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            Huevos: <strong>{stats.categories.huevos || 0}</strong>
          </span>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setSelectedDayFilter('all')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition min-h-[44px] whitespace-nowrap shrink-0 ${
            selectedDayFilter === 'all'
              ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }`}
        >
          Semana Completa (7 días)
        </button>

        {DAYS.map((d) => {
          const hasAlmuerzo = !!weeklyPlan[d.key].almuerzo;
          const hasCena = !!weeklyPlan[d.key].cena;
          const isSelected = selectedDayFilter === d.key;

          return (
            <button
              key={d.key}
              onClick={() => setSelectedDayFilter(d.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition min-h-[44px] whitespace-nowrap shrink-0 ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <span>{d.label}</span>
              {hasAlmuerzo && hasCena ? (
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-emerald-500'}`} />
              ) : hasAlmuerzo || hasCena ? (
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-200' : 'bg-amber-400'}`} />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Days Grid */}
      <div
        className={`grid gap-4 ${
          selectedDayFilter === 'all'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7'
            : 'grid-cols-1 max-w-2xl mx-auto'
        }`}
      >
        {displayedDays.map(({ key, label }) => {
          const dayData = weeklyPlan[key];
          const hasBoth = dayData.almuerzo && dayData.cena;

          return (
            <div
              key={key}
              className="flex flex-col bg-slate-50/70 dark:bg-slate-800/50 rounded-2xl border border-slate-200/90 dark:border-slate-700 p-3 shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 transition"
            >
              {/* Day Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">{label}</span>
                  {hasBoth && (
                    <span title="Día completo">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {dayData.almuerzo && dayData.cena ? '2 platos' : dayData.almuerzo || dayData.cena ? '1 plato' : 'Vacío'}
                </span>
              </div>

              {/* Day Meals Container: Almuerzo and Cena */}
              <div className="flex-1 flex flex-col gap-3">
                {/* Almuerzo */}
                <div className="flex-1 min-h-[120px]">
                  <MealCard
                    day={key}
                    mealType="almuerzo"
                    recipe={dayData.almuerzo}
                    onSelectMeal={onSelectMealSlot}
                    onClearMeal={onClearMealSlot}
                    onNavigateToPantry={onNavigateToPantry}
                  />
                </div>

                {/* Cena */}
                <div className="flex-1 min-h-[120px]">
                  <MealCard
                    day={key}
                    mealType="cena"
                    recipe={dayData.cena}
                    onSelectMeal={onSelectMealSlot}
                    onClearMeal={onClearMealSlot}
                    onNavigateToPantry={onNavigateToPantry}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
