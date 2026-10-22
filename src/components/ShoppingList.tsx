import React, { useState } from 'react';
import { IngredientCategory, IngredientItem } from '../types';
import {
  CheckSquare,
  Square,
  Home,
  Plus,
  Trash2,
  Share2,
  Copy,
  Check,
  Store,
  Filter,
  Layers,
  Info,
} from 'lucide-react';

interface ShoppingListProps {
  items: IngredientItem[];
  onToggleChecked: (id: string) => void;
  onTogglePantry: (id: string) => void;
  onAddCustomItem: (item: Omit<IngredientItem, 'id'>) => void;
  onRemoveItem: (id: string) => void;
  onClearChecked: () => void;
  onNavigateToComparator: () => void;
}

const CATEGORY_NAMES: Record<IngredientCategory, { label: string; icon: string }> = {
  verduras: { label: 'Frutas y Verduras', icon: '🥬' },
  frutas: { label: 'Frutas Frescas', icon: '🍎' },
  carnes: { label: 'Carnicería y Aves', icon: '🥩' },
  pescados: { label: 'Pescadería y Mariscos', icon: '🐟' },
  lacteos: { label: 'Lácteos y Huevos', icon: '🧀' },
  legumbres: { label: 'Legumbres y Granos', icon: '🫘' },
  despensa: { label: 'Despensa y Aceites', icon: '🥫' },
  panaderia: { label: 'Panadería y Masas', icon: '🥖' },
  otros: { label: 'Otros / Varios', icon: '🛒' },
};

export const ShoppingList: React.FC<ShoppingListProps> = ({
  items,
  onToggleChecked,
  onTogglePantry,
  onAddCustomItem,
  onRemoveItem,
  onClearChecked,
  onNavigateToComparator,
}) => {
  const [filterPendingOnly, setFilterPendingOnly] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // New item form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('1');
  const [newItemUnit, setNewItemUnit] = useState('ud');
  const [newItemCategory, setNewItemCategory] = useState<IngredientCategory>('otros');
  const [showAddForm, setShowAddForm] = useState(false);

  // Filter items
  const displayItems = items.filter((item) => {
    if (filterPendingOnly && item.checked) return false;
    return true;
  });

  // Group items by category
  const groupedByCategory = displayItems.reduce((acc, item) => {
    const cat = item.category || 'otros';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<IngredientCategory, IngredientItem[]>);

  const totalToBuy = items.filter((i) => !i.inPantry).length;
  const completedCount = items.filter((i) => !i.inPantry && i.checked).length;
  const pantryCount = items.filter((i) => i.inPantry).length;

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    onAddCustomItem({
      name: newItemName.trim(),
      amount: parseFloat(newItemAmount) || 1,
      unit: newItemUnit.trim() || 'ud',
      category: newItemCategory,
      inPantry: false,
      checked: false,
      custom: true,
      sourceRecipes: ['Añadido manual'],
    });

    setNewItemName('');
    setNewItemAmount('1');
    setShowAddForm(false);
  };

  const generateShareText = () => {
    const lines: string[] = ['🛒 *Lista de la Compra Semanal*', ''];
    const activeItems = items.filter((i) => !i.inPantry);

    const grouped = activeItems.reduce((acc, item) => {
      const cat = item.category || 'otros';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {} as Record<IngredientCategory, IngredientItem[]>);

    Object.entries(grouped).forEach(([catKey, catItems]) => {
      const catMeta = CATEGORY_NAMES[catKey as IngredientCategory] || { label: catKey, icon: '•' };
      lines.push(`${catMeta.icon} *${catMeta.label}*`);
      catItems.forEach((item) => {
        const check = item.checked ? '✅' : '⬜';
        lines.push(`${check} ${item.name}: ${item.amount} ${item.unit}`);
      });
      lines.push('');
    });

    return lines.join('\n');
  };

  const handleCopyClipboard = async () => {
    const text = generateShareText();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleWhatsAppShare = () => {
    const text = generateShareText();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-5">
      {/* Top Banner and Quick Metrics */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5 shadow-xs transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Lista de la Compra Semanal
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                {completedCount}/{totalToBuy} comprados
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Ingredientes consolidados de tus 14 comidas. Puedes marcar lo que ya tengas en casa o añadir extras.
            </p>
          </div>

          {/* Action Bar (Tablet optimized) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onNavigateToComparator}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition active:scale-95 min-h-[44px]"
            >
              <Store className="w-4 h-4 text-emerald-200" />
              <span>Ver Precios Alcampo vs Carrefour</span>
            </button>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition active:scale-95 min-h-[44px]"
            >
              <Plus className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span>Añadir Producto Extra</span>
            </button>

            <button
              onClick={handleCopyClipboard}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 text-xs sm:text-sm font-semibold transition min-h-[44px]"
              title="Copiar lista al portapapeles"
            >
              {copiedToast ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-300 font-bold">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>Copiar</span>
                </>
              )}
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm font-semibold transition min-h-[44px]"
              title="Compartir por WhatsApp"
            >
              <Share2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Quick status bar & Filter toggles */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              Por comprar: <strong className="text-slate-900 dark:text-white">{totalToBuy - completedCount}</strong>
            </span>
            <span>•</span>
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              En despensa (no comprar): <strong className="text-slate-900 dark:text-white">{pantryCount}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterPendingOnly(!filterPendingOnly)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-semibold transition min-h-[36px] ${
                filterPendingOnly
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300'
                  : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>{filterPendingOnly ? 'Mostrando solo pendientes' : 'Ocultar comprados'}</span>
            </button>

            {completedCount > 0 && (
              <button
                onClick={onClearChecked}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 underline font-medium px-2 py-1"
              >
                Desmarcar todos
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Add Custom Item Form (Collapsible) */}
      {showAddForm && (
        <form
          onSubmit={handleAddItem}
          className="bg-white rounded-2xl border border-emerald-200 p-4 sm:p-5 shadow-sm space-y-4 animate-in fade-in duration-150"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Añadir producto extra a la lista (Desayunos, limpieza, caprichos...)
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
            >
              Cerrar
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nombre del producto
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Café molido, Leche desnatada, Papel higiénico..."
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Cantidad y unidad
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={newItemAmount}
                  onChange={(e) => setNewItemAmount(e.target.value)}
                  className="w-20 px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none min-h-[44px]"
                />
                <input
                  type="text"
                  placeholder="ud, g, L, brik"
                  value={newItemUnit}
                  onChange={(e) => setNewItemUnit(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Categoría
              </label>
              <select
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value as IngredientCategory)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none min-h-[44px]"
              >
                {Object.entries(CATEGORY_NAMES).map(([key, { label, icon }]) => (
                  <option key={key} value={key}>
                    {icon} {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition min-h-[44px]"
            >
              Guardar en la lista
            </button>
          </div>
        </form>
      )}

      {/* Main Shopping List categorized by Supermarket Sections */}
      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-md mx-auto">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-3">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">La lista de la compra está vacía</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Asigna platos a tu semana o genera un menú automático para que los ingredientes aparezcan aquí.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {(Object.keys(groupedByCategory) as IngredientCategory[]).map((categoryKey) => {
            const catItems = groupedByCategory[categoryKey];
            if (!catItems || catItems.length === 0) return null;
            const meta = CATEGORY_NAMES[categoryKey] || { label: categoryKey, icon: '🛒' };

            return (
              <div
                key={categoryKey}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/90 dark:border-slate-700 shadow-2xs overflow-hidden transition-colors"
              >
                {/* Department Header */}
                <div className="bg-slate-50/90 dark:bg-slate-800/90 px-4 py-2.5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{meta.icon}</span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white tracking-tight">{meta.label}</h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {catItems.length} {catItems.length === 1 ? 'producto' : 'productos'}
                  </span>
                </div>

                {/* Items List */}
                <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                  {catItems.map((item) => {
                    const isCrossed = item.checked && !item.inPantry;

                    return (
                      <li
                        key={item.id}
                        className={`flex items-center justify-between p-3 sm:px-4 sm:py-3 transition hover:bg-slate-50/60 dark:hover:bg-slate-700/50 ${
                          item.inPantry
                            ? 'bg-slate-50/40 dark:bg-slate-800/40 opacity-75'
                            : isCrossed
                            ? 'bg-emerald-50/20 dark:bg-emerald-950/20'
                            : ''
                        }`}
                      >
                        {/* Checkbox and Name */}
                        <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                          {/* Buy checkbox */}
                          <button
                            onClick={() => onToggleChecked(item.id)}
                            disabled={item.inPantry}
                            className={`p-1 rounded-md text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition min-h-[36px] min-w-[36px] flex items-center justify-center ${
                              item.inPantry ? 'opacity-30 cursor-not-allowed' : ''
                            }`}
                            aria-label={`Marcar ${item.name} como comprado`}
                          >
                            {isCrossed ? (
                              <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                            )}
                          </button>

                          {/* Ingredient info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`font-semibold text-sm sm:text-base ${
                                  isCrossed
                                    ? 'line-through text-slate-400 dark:text-slate-500'
                                    : item.inPantry
                                    ? 'text-slate-500 dark:text-slate-400 italic'
                                    : 'text-slate-900 dark:text-white'
                                }`}
                              >
                                {item.name}
                              </span>

                              {/* Amount badge */}
                              <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                                {item.amount} {item.unit}
                              </span>

                              {/* In Pantry Badge */}
                              {item.inPantry && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                                  <Home className="w-3 h-3" />
                                  Tengo en casa
                                </span>
                              )}
                            </div>

                            {/* Source recipe attribution */}
                            {item.sourceRecipes && item.sourceRecipes.length > 0 && (
                              <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                                Recetas: {item.sourceRecipes.join(', ')}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Pantry Toggle & Delete Actions */}
                        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                          {/* "Tengo en casa" button */}
                          <button
                            onClick={() => onTogglePantry(item.id)}
                            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition min-h-[36px] ${
                              item.inPantry
                                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-900'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-600 hover:text-amber-800 dark:hover:text-amber-300'
                            }`}
                            title={item.inPantry ? 'Volver a incluir en la compra' : 'Marcar que ya lo tienes en casa'}
                          >
                            <Home className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">
                              {item.inPantry ? 'En despensa' : 'Tengo en casa'}
                            </span>
                          </button>

                          {/* Delete if custom or clear */}
                          {item.custom && (
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md transition min-h-[36px] min-w-[36px] flex items-center justify-center"
                              title="Eliminar producto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
