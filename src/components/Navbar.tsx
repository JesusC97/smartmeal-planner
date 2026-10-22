import React from 'react';
import {
  Calendar,
  ShoppingCart,
  Store,
  ChefHat,
  Smartphone,
  Home,
  Moon,
  Sun,
  Sparkles,
  Apple,
} from 'lucide-react';
import { ActiveTab } from '../types';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  shoppingItemCount: number;
  pantryItemCount: number;
  priceDifference: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenQuickMenuGen: () => void;
  onOpenIOSGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  shoppingItemCount,
  pantryItemCount,
  priceDifference,
  darkMode,
  onToggleDarkMode,
  onOpenQuickMenuGen,
  onOpenIOSGuide,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors safe-top">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <ChefHat className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-base sm:text-xl text-slate-900 dark:text-white tracking-tight leading-none">
                  Menú & Compra
                </span>
                <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                  Tablet & iPhone
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Alcampo vs Carrefour • Modo App
              </p>
            </div>
          </div>

          {/* Center Tabs Navigation (Hidden on mobile phones, shown on Tablet and Desktop) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl transition-colors" aria-label="Navegación principal">
            <button
              onClick={() => setActiveTab('planner')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all min-h-[44px] ${
                activeTab === 'planner'
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Semana</span>
            </button>

            <button
              onClick={() => setActiveTab('shopping')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all min-h-[44px] relative ${
                activeTab === 'shopping'
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Compra</span>
              {shoppingItemCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full bg-emerald-600 text-white">
                  {shoppingItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('pantry')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all min-h-[44px] relative ${
                activeTab === 'pantry'
                  ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Despensa</span>
              {pantryItemCount > 0 && (
                <span className="hidden sm:inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                  {pantryItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('comparator')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all min-h-[44px] relative ${
                activeTab === 'comparator'
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
              }`}
            >
              <Store className="w-4 h-4" />
              <span className="hidden md:inline">Alcampo vs Carrefour</span>
              <span className="md:hidden">Precios</span>
              {priceDifference > 0 && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                  ±{priceDifference.toFixed(1)}€
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('recipes')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all min-h-[44px] ${
                activeTab === 'recipes'
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
              }`}
            >
              <ChefHat className="w-4 h-4" />
              <span className="hidden sm:inline">Recetas</span>
            </button>
          </nav>

          {/* Right Tools: Dark Mode, Quick Menu & Install */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quick Menu Generator Button */}
            <button
              onClick={onOpenQuickMenuGen}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-xs font-semibold transition min-h-[44px] active:scale-95"
              title="Generar menú semanal equilibrado"
              aria-label="Generar menú automático equilibrado"
            >
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="hidden sm:inline">Menú Auto</span>
            </button>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition min-h-[44px] min-w-[44px] flex items-center justify-center shadow-2xs active:scale-95"
              title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Android / Desktop PWA Install Button */}
            {isInstallable && (
              <button
                onClick={install}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white text-xs font-semibold transition min-h-[44px] shadow-xs active:scale-95"
                title="Instalar en tu Tablet Android como aplicación"
                aria-label="Instalar app en tablet Android"
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Instalar</span>
              </button>
            )}

            {/* iPhone Safari Install Guide Button */}
            {isIOS && !isInstalled && (
              <button
                onClick={onOpenIOSGuide}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold transition min-h-[44px] shadow-xs active:scale-95"
                title="Instalar en tu iPhone"
                aria-label="Instalar en iPhone"
              >
                <Apple className="w-4 h-4" />
                <span className="hidden sm:inline">Instalar</span>
              </button>
            )}

            {/* General iPhone/Android guide trigger when not installable */}
            {!isInstallable && !isIOS && !isInstalled && (
              <button
                onClick={onOpenIOSGuide}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium transition min-h-[44px] active:scale-95"
                title="Cómo instalar en iPhone o Tablet"
                aria-label="Instalar en móvil o tablet"
              >
                <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[11px] font-semibold">Instalar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
