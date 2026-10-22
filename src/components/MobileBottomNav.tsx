import React from 'react';
import {
  Calendar,
  ShoppingCart,
  Home,
  Store,
  ChefHat,
} from 'lucide-react';
import { ActiveTab } from '../types';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  shoppingItemCount: number;
  pantryItemCount: number;
  priceDifference: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  shoppingItemCount,
  pantryItemCount,
  priceDifference,
}) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-lg safe-bottom transition-colors"
      aria-label="Navegación móvil"
    >
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto px-1 items-center">
        {/* 1. Semana */}
        <button
          onClick={() => setActiveTab('planner')}
          className={`flex flex-col items-center justify-center h-full py-1 gap-1 text-[11px] font-medium transition active:scale-95 ${
            activeTab === 'planner'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
          aria-label="Ir a Planificador semanal"
        >
          <div className="relative">
            <Calendar className={`w-5 h-5 ${activeTab === 'planner' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {activeTab === 'planner' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
            )}
          </div>
          <span className="leading-none">Semana</span>
        </button>

        {/* 2. Compra */}
        <button
          onClick={() => setActiveTab('shopping')}
          className={`flex flex-col items-center justify-center h-full py-1 gap-1 text-[11px] font-medium transition active:scale-95 relative ${
            activeTab === 'shopping'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
          aria-label="Ir a Lista de la compra"
        >
          <div className="relative">
            <ShoppingCart className={`w-5 h-5 ${activeTab === 'shopping' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {shoppingItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-4 px-1 flex items-center justify-center text-[10px] font-black rounded-full bg-emerald-600 text-white shadow-2xs">
                {shoppingItemCount}
              </span>
            )}
            {activeTab === 'shopping' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
            )}
          </div>
          <span className="leading-none">Compra</span>
        </button>

        {/* 3. Despensa */}
        <button
          onClick={() => setActiveTab('pantry')}
          className={`flex flex-col items-center justify-center h-full py-1 gap-1 text-[11px] font-medium transition active:scale-95 relative ${
            activeTab === 'pantry'
              ? 'text-purple-600 dark:text-purple-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
          aria-label="Ir a Despensa de casa"
        >
          <div className="relative">
            <Home className={`w-5 h-5 ${activeTab === 'pantry' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {pantryItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[14px] h-3.5 px-0.5 flex items-center justify-center text-[9px] font-bold rounded-full bg-purple-100 dark:bg-purple-900/80 text-purple-700 dark:text-purple-300">
                {pantryItemCount}
              </span>
            )}
            {activeTab === 'pantry' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-600 dark:bg-purple-400 rounded-full" />
            )}
          </div>
          <span className="leading-none">Despensa</span>
        </button>

        {/* 4. Precios (Alcampo vs Carrefour) */}
        <button
          onClick={() => setActiveTab('comparator')}
          className={`flex flex-col items-center justify-center h-full py-1 gap-1 text-[11px] font-medium transition active:scale-95 relative ${
            activeTab === 'comparator'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
          aria-label="Ir a Comparador de precios"
        >
          <div className="relative">
            <Store className={`w-5 h-5 ${activeTab === 'comparator' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {priceDifference > 0 && (
              <span className="absolute -top-1 -right-2.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900" />
            )}
            {activeTab === 'comparator' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
            )}
          </div>
          <span className="leading-none">Precios</span>
        </button>

        {/* 5. Recetas */}
        <button
          onClick={() => setActiveTab('recipes')}
          className={`flex flex-col items-center justify-center h-full py-1 gap-1 text-[11px] font-medium transition active:scale-95 ${
            activeTab === 'recipes'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
          aria-label="Ir a Recetario"
        >
          <div className="relative">
            <ChefHat className={`w-5 h-5 ${activeTab === 'recipes' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {activeTab === 'recipes' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
            )}
          </div>
          <span className="leading-none">Recetas</span>
        </button>
      </div>
    </nav>
  );
};
