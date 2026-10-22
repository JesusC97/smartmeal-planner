import React, { useState } from 'react';
import { BasketComparison, IngredientItem, ProductCustomLinksMap } from '../types';
import {
  Store,
  ExternalLink,
  Search,
  CheckCircle2,
  TrendingDown,
  Link2,
  ShoppingCart,
  Copy,
  Check,
} from 'lucide-react';
import { formatCurrency } from '../utils/calculator';

interface PriceComparatorProps {
  comparison: BasketComparison;
  items: IngredientItem[];
  customLinks: ProductCustomLinksMap;
  onNavigateToShopping: () => void;
  onOpenLinkManager: () => void;
  onPrepareCart: (store: 'alcampo' | 'carrefour') => void;
}

type FilterStore = 'all' | 'alcampo-cheaper' | 'carrefour-cheaper' | 'equal';

export const PriceComparator: React.FC<PriceComparatorProps> = ({
  comparison,
  items,
  customLinks,
  onNavigateToShopping,
  onOpenLinkManager,
  onPrepareCart,
}) => {
  const [filterStore, setFilterStore] = useState<FilterStore>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPreferredStore, setSelectedPreferredStore] = useState<'alcampo' | 'carrefour'>(
    comparison.cheaperSupermarket === 'carrefour' ? 'carrefour' : 'alcampo'
  );

  const {
    totalAlcampo,
    totalCarrefour,
    cheaperSupermarket,
    differenceAmount,
    differencePercentage,
    items: comparedItems,
  } = comparison;

  // Filter comparison items
  const filteredItems = comparedItems.filter((item) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.ingredient.name.toLowerCase().includes(q);
      const matchProduct = item.priceInfo.productName.toLowerCase().includes(q);
      if (!matchName && !matchProduct) return false;
    }

    if (filterStore === 'alcampo-cheaper') {
      return item.cheaperStore === 'alcampo';
    }
    if (filterStore === 'carrefour-cheaper') {
      return item.cheaperStore === 'carrefour';
    }
    if (filterStore === 'equal') {
      return item.cheaperStore === 'empate';
    }
    return true;
  });

  const isAlcampoCheaper = cheaperSupermarket === 'alcampo';
  const isCarrefourCheaper = cheaperSupermarket === 'carrefour';
  const customLinksCount = Object.keys(customLinks).length;

  return (
    <div className="space-y-6">
      {/* Top Header & Context */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Comparador: Todo en Alcampo vs Todo en Carrefour
              </h2>
              {differenceAmount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  Diferencia de {formatCurrency(differenceAmount)} ({differencePercentage}%)
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Compara el coste total de hacer toda tu compra semanal en un único supermercado.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenLinkManager}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition min-h-[44px]"
              title="Añadir enlaces específicos directos para tus productos"
            >
              <Link2 className="w-4 h-4 text-emerald-600" />
              <span>Enlaces Específicos</span>
              {customLinksCount > 0 && (
                <span className="px-1.5 py-0.5 bg-emerald-600 text-white text-[11px] font-bold rounded-full ml-1">
                  {customLinksCount}
                </span>
              )}
            </button>

            <button
              onClick={onNavigateToShopping}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold transition min-h-[44px]"
            >
              Volver a la lista ({comparedItems.length} productos)
            </button>
          </div>
        </div>

        {/* Supermarket Winner Result Callout */}
        <div
          className={`mt-4 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isAlcampoCheaper
              ? 'bg-rose-50/80 border-rose-200 text-rose-950'
              : isCarrefourCheaper
              ? 'bg-blue-50/80 border-blue-200 text-blue-950'
              : 'bg-slate-50 border-slate-200 text-slate-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-base shrink-0 shadow-sm ${
                isAlcampoCheaper ? 'bg-rose-600' : isCarrefourCheaper ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              {isAlcampoCheaper ? 'A' : isCarrefourCheaper ? 'C' : '='}
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">
                {isAlcampoCheaper
                  ? 'Alcampo sale más barato para toda la compra de la semana'
                  : isCarrefourCheaper
                  ? 'Carrefour sale más barato para toda la compra de la semana'
                  : 'Empate de precio entre ambos supermercados'}
              </h3>
              <p className="text-xs opacity-90 mt-0.5">
                {isAlcampoCheaper
                  ? `Comprando todo en Alcampo te ahorras ${formatCurrency(differenceAmount)} respecto a Carrefour.`
                  : isCarrefourCheaper
                  ? `Comprando todo en Carrefour te ahorras ${formatCurrency(differenceAmount)} respecto a Alcampo.`
                  : 'Ambos hipermercados tienen exactamente el mismo importe total.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onPrepareCart(isAlcampoCheaper ? 'alcampo' : 'carrefour')}
            className={`px-4 py-2.5 rounded-xl text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition min-h-[44px] shrink-0 flex items-center justify-center gap-2 ${
              isAlcampoCheaper ? 'bg-rose-600 hover:bg-rose-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Preparar Carrito Ganador</span>
          </button>
        </div>

        {/* 2 Core Supermarket Comparison Cards (Strictly Alcampo vs Carrefour) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {/* Card 1: Todo en Alcampo */}
          <div
            className={`rounded-2xl border p-5 transition-all relative overflow-hidden flex flex-col justify-between ${
              isAlcampoCheaper
                ? 'bg-rose-50/50 border-rose-300 ring-2 ring-rose-500/20 shadow-sm'
                : 'bg-white border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-rose-600 inline-block" />
                  <span className="font-bold text-base text-slate-900">Comprar Todo en Alcampo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                    Auchan
                  </span>
                  {isAlcampoCheaper && (
                    <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Más Barato ★
                    </span>
                  )}
                </div>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
                {formatCurrency(totalAlcampo)}
              </div>

              <p className="text-xs text-slate-500 mt-1">
                {isAlcampoCheaper
                  ? `Ahorras ${formatCurrency(differenceAmount)} comprando todo aquí`
                  : `+${formatCurrency(differenceAmount)} respecto a Carrefour`}
                {' • '}{comparedItems.length} productos
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
              <button
                onClick={() => onPrepareCart('alcampo')}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-xs transition min-h-[44px]"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Preparar Carrito Alcampo</span>
              </button>

              <a
                href="https://www.alcampo.es/compra-online/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold min-h-[44px]"
              >
                <span>Web Alcampo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 2: Todo en Carrefour */}
          <div
            className={`rounded-2xl border p-5 transition-all relative overflow-hidden flex flex-col justify-between ${
              isCarrefourCheaper
                ? 'bg-blue-50/50 border-blue-300 ring-2 ring-blue-500/20 shadow-sm'
                : 'bg-white border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-blue-600 inline-block" />
                  <span className="font-bold text-base text-slate-900">Comprar Todo en Carrefour</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                    Carrefour Classic
                  </span>
                  {isCarrefourCheaper && (
                    <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Más Barato ★
                    </span>
                  )}
                </div>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
                {formatCurrency(totalCarrefour)}
              </div>

              <p className="text-xs text-slate-500 mt-1">
                {isCarrefourCheaper
                  ? `Ahorras ${formatCurrency(differenceAmount)} comprando todo aquí`
                  : `+${formatCurrency(differenceAmount)} respecto a Alcampo`}
                {' • '}{comparedItems.length} productos
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
              <button
                onClick={() => onPrepareCart('carrefour')}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition min-h-[44px]"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Preparar Carrito Carrefour</span>
              </button>

              <a
                href="https://www.carrefour.es/supermercado/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 text-xs font-semibold min-h-[44px]"
              >
                <span>Web Carrefour</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Buscar ingrediente o producto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterStore('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition min-h-[36px] ${
              filterStore === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({comparedItems.length})
          </button>

          <button
            onClick={() => setFilterStore('alcampo-cheaper')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition min-h-[36px] ${
              filterStore === 'alcampo-cheaper'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            Más barato en Alcampo
          </button>

          <button
            onClick={() => setFilterStore('carrefour-cheaper')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition min-h-[36px] ${
              filterStore === 'carrefour-cheaper'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200'
            }`}
          >
            Más barato en Carrefour
          </button>
        </div>
      </div>

      {/* Product-by-Product Comparison List */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isAlcampoCheaperItem = item.cheaperStore === 'alcampo';
          const isCarrefourCheaperItem = item.cheaperStore === 'carrefour';
          const isEqualItem = item.cheaperStore === 'empate';
          const key = item.ingredient.name.toLowerCase().trim();
          const hasCustomLink = !!(customLinks[key]?.alcampoUrl || customLinks[key]?.carrefourUrl);

          return (
            <div
              key={item.ingredient.id}
              className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-2xs hover:shadow-md transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* Left: Ingredient Name & Recipe Source */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-sm sm:text-base text-slate-900">
                      {item.ingredient.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-800">
                      {item.ingredient.amount} {item.ingredient.unit}
                    </span>

                    {/* Advantage Tag */}
                    {isAlcampoCheaperItem && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                        Alcampo -{formatCurrency(item.itemSavings)}
                      </span>
                    )}
                    {isCarrefourCheaperItem && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                        Carrefour -{formatCurrency(item.itemSavings)}
                      </span>
                    )}
                    {isEqualItem && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        Mismo precio
                      </span>
                    )}

                    {hasCustomLink && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Enlace específico propio ✓
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 mt-0.5">
                    {item.priceInfo.productName}
                  </p>
                </div>

                {/* Right: Side-by-Side Supermarket Price Columns */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4 shrink-0 sm:min-w-[340px]">
                  {/* Alcampo Column */}
                  <div
                    className={`p-2.5 rounded-xl border flex flex-col justify-between ${
                      isAlcampoCheaperItem
                        ? 'bg-rose-50/70 border-rose-300 ring-1 ring-rose-400'
                        : 'bg-slate-50/80 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-rose-700">Alcampo</span>
                      <span className="text-slate-500 truncate max-w-[85px]">
                        {item.priceInfo.alcampo.brand}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <span className="font-black text-base sm:text-lg text-slate-900">
                        {formatCurrency(item.calculatedPriceAlcampo)}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {item.priceInfo.alcampo.unitPrice}
                      </span>
                    </div>

                    <a
                      href={item.alcampoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-[11px] text-rose-600 hover:text-rose-800 flex items-center gap-0.5 font-medium"
                    >
                      <span>Abrir producto</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>

                  {/* Carrefour Column */}
                  <div
                    className={`p-2.5 rounded-xl border flex flex-col justify-between ${
                      isCarrefourCheaperItem
                        ? 'bg-blue-50/70 border-blue-300 ring-1 ring-blue-400'
                        : 'bg-slate-50/80 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-blue-700">Carrefour</span>
                      <span className="text-slate-500 truncate max-w-[85px]">
                        {item.priceInfo.carrefour.brand}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <span className="font-black text-base sm:text-lg text-slate-900">
                        {formatCurrency(item.calculatedPriceCarrefour)}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {item.priceInfo.carrefour.unitPrice}
                      </span>
                    </div>

                    <a
                      href={item.carrefourUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-[11px] text-blue-600 hover:text-blue-800 flex items-center gap-0.5 font-medium"
                    >
                      <span>Abrir producto</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
