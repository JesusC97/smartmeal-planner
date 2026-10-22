import React, { useState } from 'react';
import { BasketComparison, IngredientItem } from '../types';
import {
  X,
  ExternalLink,
  Copy,
  Check,
  ShoppingBag,
  AlertCircle,
  Sparkles,
  Link2,
} from 'lucide-react';
import { formatCurrency } from '../utils/calculator';

interface CartLauncherModalProps {
  isOpen: boolean;
  onClose: () => void;
  store: 'alcampo' | 'carrefour';
  comparison: BasketComparison;
  onOpenLinkManager: () => void;
}

export const CartLauncherModal: React.FC<CartLauncherModalProps> = ({
  isOpen,
  onClose,
  store,
  comparison,
  onOpenLinkManager,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [openedItems, setOpenedItems] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const isAlcampo = store === 'alcampo';
  const storeName = isAlcampo ? 'Alcampo' : 'Carrefour';
  const total = isAlcampo ? comparison.totalAlcampo : comparison.totalCarrefour;
  const storeColor = isAlcampo ? 'rose' : 'blue';

  const markOpened = (id: string, url: string) => {
    setOpenedItems((prev) => ({ ...prev, [id]: true }));
    window.open(url, '_blank');
  };

  const handleOpenAllSequential = () => {
    // Open the first 5 to avoid popup blocker, or open official store homepage + items
    comparison.items.forEach((item, index) => {
      const url = isAlcampo ? item.alcampoUrl : item.carrefourUrl;
      setTimeout(() => {
        window.open(url, '_blank');
      }, index * 400);
    });
  };

  const handleCopyProductLinks = async () => {
    const lines = [
      `🛒 *Mi Cesta de la Compra en ${storeName}*`,
      `Total estimado: ${formatCurrency(total)} (${comparison.items.length} productos)`,
      '',
    ];

    comparison.items.forEach((item, idx) => {
      const url = isAlcampo ? item.alcampoUrl : item.carrefourUrl;
      lines.push(`${idx + 1}. ${item.ingredient.name} (${item.ingredient.amount} ${item.ingredient.unit})`);
      lines.push(`   ${url}`);
    });

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div
          className={`p-4 sm:px-6 sm:py-4 border-b flex items-center justify-between ${
            isAlcampo ? 'bg-rose-50 border-rose-100' : 'bg-blue-50 border-blue-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm ${
                isAlcampo ? 'bg-rose-600' : 'bg-blue-600'
              }`}
            >
              {isAlcampo ? 'A' : 'C'}
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-slate-900">
                Preparar Carrito en {storeName}
              </h3>
              <p className="text-xs text-slate-600">
                {comparison.items.length} productos • Total estimado: {formatCurrency(total)}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Cerrar preparación de carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security and Credentials Information Callout */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs text-slate-600 space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <AlertCircle className="w-4 h-4 text-emerald-600" />
            <span>¿Cómo funciona con tu cuenta de {storeName}?</span>
          </div>
          <p>
            Por seguridad bancaria y protección contra bots, {storeName} no permite que webs externas inicien sesión con tu contraseña directamente. 
            <strong>Con tu sesión ya iniciada en {storeName}.es</strong> en este navegador o tablet, al pulsar en cada producto se abre directamente tu artículo listo para añadirlo al carrito con 1 clic.
          </p>
        </div>

        {/* Quick Launch Actions */}
        <div className="p-3 sm:px-6 py-3 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={handleCopyProductLinks}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition min-h-[44px]"
          >
            {copiedAll ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">¡Enlaces copiados!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600" />
                <span>Copiar todos los enlaces</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenLinkManager}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-semibold transition min-h-[44px]"
          >
            <Link2 className="w-4 h-4 text-emerald-600" />
            <span>Asignar Enlaces Específicos</span>
          </button>

          <a
            href={isAlcampo ? 'https://www.alcampo.es/compra-online/' : 'https://www.carrefour.es/supermercado/'}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs sm:text-sm font-bold shadow-xs transition min-h-[44px] ${
              isAlcampo ? 'bg-rose-600 hover:bg-rose-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <span>Abrir {storeName} Online</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Product Items List with Direct Launch Buttons */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Productos a comprar en {storeName} ({comparison.items.length})
          </h4>

          {comparison.items.map((item) => {
            const url = isAlcampo ? item.alcampoUrl : item.carrefourUrl;
            const price = isAlcampo ? item.calculatedPriceAlcampo : item.calculatedPriceCarrefour;
            const brand = isAlcampo ? item.priceInfo.alcampo.brand : item.priceInfo.carrefour.brand;
            const isOpened = !!openedItems[item.ingredient.id];

            return (
              <div
                key={item.ingredient.id}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition ${
                  isOpened ? 'bg-emerald-50/40 border-emerald-200' : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-slate-900">{item.ingredient.name}</span>
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700">
                      {item.ingredient.amount} {item.ingredient.unit}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{brand}</span>
                  </div>
                  <span className="text-xs font-black text-slate-900 block mt-0.5">
                    {formatCurrency(price)}
                  </span>
                </div>

                <button
                  onClick={() => markOpened(item.ingredient.id, url)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition min-h-[44px] shrink-0 ${
                    isOpened
                      ? 'bg-emerald-100 text-emerald-800'
                      : isAlcampo
                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                  }`}
                  title={`Abrir página de ${item.ingredient.name} en ${storeName}`}
                >
                  <span>{isOpened ? 'Añadido / Abierto' : 'Añadir al Carrito'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="text-xs text-slate-500 font-medium">
            Pulsa en cada producto para cargarlo en tu cesta de {storeName}.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-bold hover:bg-slate-800 min-h-[44px]"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
