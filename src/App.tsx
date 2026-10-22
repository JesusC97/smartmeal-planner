import React, { useState, useMemo, useEffect } from 'react';
import {
  WeeklyPlan,
  Recipe,
  DayOfWeek,
  MealType,
  IngredientItem,
  ProductCustomLinksMap,
  ActiveTab,
} from './types';
import { DEFAULT_RECIPES, INITIAL_WEEKLY_PLAN } from './data/defaultRecipes';
import { useLocalStorage } from './hooks/useLocalStorage';
import {
  consolidateIngredients,
  calculateBasketComparison,
} from './utils/calculator';
import { Navbar } from './components/Navbar';
import { MealPlanner } from './components/MealPlanner';
import { ShoppingList } from './components/ShoppingList';
import { PriceComparator } from './components/PriceComparator';
import { PantryView } from './components/PantryView';
import { RecipeLibrary } from './components/RecipeLibrary';
import { RecipeSelectorModal } from './components/RecipeSelectorModal';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { RecipeEditorModal } from './components/RecipeEditorModal';
import { QuickMenuGeneratorModal } from './components/QuickMenuGeneratorModal';
import { ProductLinkManagerModal } from './components/ProductLinkManagerModal';
import { CartLauncherModal } from './components/CartLauncherModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { IOSInstallGuideModal } from './components/IOSInstallGuideModal';

export default function App() {
  // Navigation tab state: 'planner' | 'shopping' | 'pantry' | 'comparator' | 'recipes'
  const [activeTab, setActiveTab] = useState<ActiveTab>('planner');

  // Dark mode state
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('menu_dark_mode_v2', false);

  // Sync dark class with document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Core persistent states
  const [weeklyPlan, setWeeklyPlan] = useLocalStorage<WeeklyPlan>(
    'menu_weekly_plan_v1',
    INITIAL_WEEKLY_PLAN
  );

  const [recipes, setRecipes] = useLocalStorage<Recipe[]>(
    'menu_recipes_v1',
    DEFAULT_RECIPES
  );

  const [customExtraItems, setCustomExtraItems] = useLocalStorage<IngredientItem[]>(
    'menu_extra_items_v1',
    []
  );

  const [pantryItemIds, setPantryItemIds] = useLocalStorage<Record<string, boolean>>(
    'menu_pantry_ids_v1',
    {}
  );

  const [checkedItemIds, setCheckedItemIds] = useLocalStorage<Record<string, boolean>>(
    'menu_checked_ids_v1',
    {}
  );

  // Custom product links map (user supplied specific URLs for Alcampo or Carrefour)
  const [customLinks, setCustomLinks] = useLocalStorage<ProductCustomLinksMap>(
    'menu_custom_links_v1',
    {}
  );

  // Modals state
  const [selectorSlot, setSelectorSlot] = useState<{
    day: DayOfWeek;
    mealType: MealType;
  } | null>(null);

  const [viewingRecipe, setViewingRecipe] = useState<Recipe | null>(null);
  const [isCreatingRecipe, setIsCreatingRecipe] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const [isLinkManagerOpen, setIsLinkManagerOpen] = useState(false);
  const [cartLauncherStore, setCartLauncherStore] = useState<'alcampo' | 'carrefour' | null>(null);
  const [isIOSGuideOpen, setIsIOSGuideOpen] = useState(false);

  // Auto-consolidate ingredients based on meals & extras (portions fixed to 1)
  const consolidatedList = useMemo(() => {
    const rawList = consolidateIngredients(
      weeklyPlan,
      customExtraItems,
      1
    );

    return rawList.map((item) => ({
      ...item,
      inPantry: !!pantryItemIds[item.name.toLowerCase().trim()],
      checked: !!checkedItemIds[item.id],
    }));
  }, [weeklyPlan, customExtraItems, pantryItemIds, checkedItemIds]);

  // Compute price comparisons for full basket in Alcampo vs Carrefour with user custom links
  const basketComparison = useMemo(() => {
    return calculateBasketComparison(consolidatedList, customLinks);
  }, [consolidatedList, customLinks]);

  // Handler: Assign recipe to meal slot
  const handleAssignRecipe = (recipe: Recipe) => {
    if (!selectorSlot) return;
    const { day, mealType } = selectorSlot;

    setWeeklyPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: recipe,
      },
    }));
  };

  // Handler: Clear single meal slot
  const handleClearMealSlot = (day: DayOfWeek, mealType: MealType) => {
    setWeeklyPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: null,
      },
    }));
  };

  // Handler: Clear entire week
  const handleClearEntireWeek = () => {
    const empty: WeeklyPlan = {
      lunes: { almuerzo: null, cena: null },
      martes: { almuerzo: null, cena: null },
      miercoles: { almuerzo: null, cena: null },
      jueves: { almuerzo: null, cena: null },
      viernes: { almuerzo: null, cena: null },
      sabado: { almuerzo: null, cena: null },
      domingo: { almuerzo: null, cena: null },
    };
    setWeeklyPlan(empty);
  };

  // Toggle bought item
  const handleToggleChecked = (id: string) => {
    setCheckedItemIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Toggle in pantry (exclude from shopping)
  const handleTogglePantry = (id: string) => {
    const target = consolidatedList.find((i) => i.id === id);
    if (!target) return;
    const key = target.name.toLowerCase().trim();
    setPantryItemIds((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Toggle pantry status by name (for the PantryView)
  const handleTogglePantryByName = (name: string) => {
    const key = name.toLowerCase().trim();
    setPantryItemIds((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Add custom non-recipe item
  const handleAddCustomItem = (newItem: Omit<IngredientItem, 'id'>) => {
    const itemWithId: IngredientItem = {
      ...newItem,
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    setCustomExtraItems((prev) => [...prev, itemWithId]);
  };

  // Remove custom item
  const handleRemoveCustomItem = (id: string) => {
    setCustomExtraItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Uncheck all
  const handleClearAllChecked = () => {
    setCheckedItemIds({});
  };

  // Save new recipe to recipe catalog
  const handleSaveRecipe = (newRecipe: Recipe) => {
    setRecipes((prev) => [newRecipe, ...prev]);
  };

  // Update recipe ingredients in catalog
  const handleUpdateRecipeIngredients = (
    recipeId: string,
    updatedIngredients: Recipe['ingredients']
  ) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === recipeId ? { ...r, ingredients: updatedIngredients } : r
      )
    );

    // Also update instances in the weekly plan if this recipe is assigned
    setWeeklyPlan((prev) => {
      const nextPlan = { ...prev };
      (Object.keys(nextPlan) as DayOfWeek[]).forEach((day) => {
        if (nextPlan[day].almuerzo?.id === recipeId) {
          nextPlan[day].almuerzo = {
            ...nextPlan[day].almuerzo!,
            ingredients: updatedIngredients,
          };
        }
        if (nextPlan[day].cena?.id === recipeId) {
          nextPlan[day].cena = {
            ...nextPlan[day].cena!,
            ingredients: updatedIngredients,
          };
        }
      });
      return nextPlan;
    });

    if (viewingRecipe && viewingRecipe.id === recipeId) {
      setViewingRecipe((prev) => (prev ? { ...prev, ingredients: updatedIngredients } : null));
    }
  };

  // Delete custom recipe
  const handleDeleteRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const pantryCount = Object.values(pantryItemIds).filter(Boolean).length;

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-100/70 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white flex flex-col transition-colors">
        {/* Navbar with responsive tabs, dark mode toggle and PWA tablet install button */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          shoppingItemCount={consolidatedList.filter((i) => !i.inPantry && !i.checked).length}
          pantryItemCount={pantryCount}
          priceDifference={basketComparison.differenceAmount}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onOpenQuickMenuGen={() => setIsQuickMenuOpen(true)}
          onOpenIOSGuide={() => setIsIOSGuideOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8 pb-28 md:pb-8">
          {activeTab === 'planner' && (
            <MealPlanner
              weeklyPlan={weeklyPlan}
              onSelectMealSlot={(day, mealType) => setSelectorSlot({ day, mealType })}
              onClearMealSlot={handleClearMealSlot}
              onClearEntireWeek={handleClearEntireWeek}
              onAutoGenerateBalancedMenu={() => setIsQuickMenuOpen(true)}
              onNavigateToShopping={() => setActiveTab('shopping')}
              onNavigateToComparator={() => setActiveTab('comparator')}
              onNavigateToPantry={() => setActiveTab('pantry')}
            />
          )}

          {activeTab === 'shopping' && (
            <ShoppingList
              items={consolidatedList}
              onToggleChecked={handleToggleChecked}
              onTogglePantry={handleTogglePantry}
              onAddCustomItem={handleAddCustomItem}
              onRemoveItem={handleRemoveCustomItem}
              onClearChecked={handleClearAllChecked}
              onNavigateToComparator={() => setActiveTab('comparator')}
            />
          )}

          {activeTab === 'pantry' && (
            <PantryView
              items={consolidatedList}
              pantryMap={pantryItemIds}
              onTogglePantryByName={handleTogglePantryByName}
              onNavigateToPlanner={() => setActiveTab('planner')}
            />
          )}

          {activeTab === 'comparator' && (
            <PriceComparator
              comparison={basketComparison}
              items={consolidatedList}
              customLinks={customLinks}
              onNavigateToShopping={() => setActiveTab('shopping')}
              onOpenLinkManager={() => setIsLinkManagerOpen(true)}
              onPrepareCart={(store) => setCartLauncherStore(store)}
            />
          )}

          {activeTab === 'recipes' && (
            <RecipeLibrary
              recipes={recipes}
              onViewRecipe={(recipe) => setViewingRecipe(recipe)}
              onOpenCreateRecipe={() => setIsCreatingRecipe(true)}
              onDeleteRecipe={handleDeleteRecipe}
            />
          )}
        </main>

        {/* Mobile Bottom Navigation (Shown only on smartphones, hidden on Tablet & Desktop) */}
        <MobileBottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          shoppingItemCount={consolidatedList.filter((i) => !i.inPantry && !i.checked).length}
          pantryItemCount={pantryCount}
          priceDifference={basketComparison.differenceAmount}
        />

        {/* Footer */}
        <footer className="mt-auto py-5 border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors pb-20 md:pb-5">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Menú & Compra Semanal • Diseñado para Tablet Android y Móvil iPhone</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-semibold text-rose-700 dark:text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-600 inline-block" />
                Alcampo (Auchan)
              </span>
              <span>vs</span>
              <span className="flex items-center gap-1 font-semibold text-blue-700 dark:text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                Carrefour (Classic)
              </span>
            </div>
          </div>
        </footer>

        {/* Modal: Recipe Selector */}
        <RecipeSelectorModal
          isOpen={!!selectorSlot}
          onClose={() => setSelectorSlot(null)}
          day={selectorSlot?.day || null}
          mealType={selectorSlot?.mealType || null}
          recipes={recipes}
          onSelectRecipe={handleAssignRecipe}
          onOpenCreateRecipe={() => {
            setSelectorSlot(null);
            setIsCreatingRecipe(true);
          }}
        />

        {/* Modal: Recipe Details & Cooking Mode */}
        <RecipeDetailModal
          recipe={viewingRecipe}
          isOpen={!!viewingRecipe}
          onClose={() => setViewingRecipe(null)}
          servingsMultiplier={1}
          onUpdateRecipeIngredients={handleUpdateRecipeIngredients}
        />

        {/* Modal: Create Recipe */}
        <RecipeEditorModal
          isOpen={isCreatingRecipe}
          onClose={() => setIsCreatingRecipe(false)}
          onSaveRecipe={handleSaveRecipe}
        />

        {/* Modal: Quick Menu Generator */}
        <QuickMenuGeneratorModal
          isOpen={isQuickMenuOpen}
          onClose={() => setIsQuickMenuOpen(false)}
          recipes={recipes}
          onApplyPlan={(plan) => setWeeklyPlan(plan)}
        />

        {/* Modal: Product Links Manager (Alcampo & Carrefour specific URLs) */}
        <ProductLinkManagerModal
          isOpen={isLinkManagerOpen}
          onClose={() => setIsLinkManagerOpen(false)}
          items={consolidatedList}
          customLinks={customLinks}
          onSaveCustomLinks={(updated) => setCustomLinks(updated)}
        />

        {/* Modal: Cart Launcher / Preparation for Alcampo or Carrefour */}
        {cartLauncherStore && (
          <CartLauncherModal
            isOpen={!!cartLauncherStore}
            onClose={() => setCartLauncherStore(null)}
            store={cartLauncherStore}
            comparison={basketComparison}
            onOpenLinkManager={() => {
              setCartLauncherStore(null);
              setIsLinkManagerOpen(true);
            }}
          />
        )}

        {/* Modal: iOS iPhone Safari PWA Installation Guide */}
        <IOSInstallGuideModal
          isOpen={isIOSGuideOpen}
          onClose={() => setIsIOSGuideOpen(false)}
        />
      </div>
    </div>
  );
}
