import React, { useState } from 'react';
import { IngredientItem, ProductCustomLinksMap } from '../types';
import {
  X,
  Link2,
  ExternalLink,
  Check,
  Search,
  Save,
  Download,
  Upload,
  AlertCircle,
} from 'lucide-react';

interface ProductLinkManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: IngredientItem[];
  customLinks: ProductCustomLinksMap;
  onSaveCustomLinks: (links: ProductCustomLinksMap) => void;
  initialSelectedIngredient?: string | null;
}

export const ProductLinkManagerModal: React.FC<ProductLinkManagerModalProps> = ({
  isOpen,
  onClose,
  items,
  customLinks,
  onSaveCustomLinks,
  initialSelectedIngredient,
}) => {
  const [linksMap, setLinksMap] = useState<ProductCustomLinksMap>(customLinks);
  const [search, setSearch] = useState('');
  const [savedToast, setSavedToast] = useState(false);
  const [pasteBuffer, setPasteBuffer] = useState('');

  if (!isOpen) return null;

  // Filter items
  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateUrl = (ingredientName: string, store: 'alcampo' | 'carrefour', url: string) => {
    const key = ingredientName.toLowerCase().trim();
    setLinksMap((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [store === 'alcampo' ? 'alcampoUrl' : 'carrefourUrl']: url.trim(),
      },
    }));
  };

  const handleSmartPaste = (ingredientName: string) => {
    if (!pasteBuffer.trim()) return;
    const url = pasteBuffer.trim();
    const key = ingredientName.toLowerCase().trim();

    if (url.includes('alcampo.es')) {
      handleUpdateUrl(ingredientName, 'alcampo', url);
    } else if (url.includes('carrefour.es')) {
      handleUpdateUrl(ingredientName, 'carrefour', url);
    } else {
      // Default to Alcampo if unspecified
      handleUpdateUrl(ingredientName, 'alcampo', url);
    }
    setPasteBuffer('');
  };

  const handleSave = () => {
    onSaveCustomLinks(linksMap);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 600);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(linksMap, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'enlaces_alcampo_carrefour.json');
    dlAnchorElem.click();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        setLinksMap((prev) => ({ ...prev, ...parsed }));
      } catch (err) {
        alert('Archivo JSON no válido');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-4 sm:px-6 sm:py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <Link2 className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-base sm:text-lg text-slate-900">
                Gestor de Enlaces Específicos (Alcampo & Carrefour)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Pega aquí los enlaces exactos de los productos que sueles comprar para que al pulsar en el carrito vayas directo a tu producto favorito.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Cerrar gestor de enlaces"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar & Search */}
        <div className="p-3 sm:p-4 border-b border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Buscar producto de la lista..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <label className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer min-h-[44px]">
              <Upload className="w-3.5 h-3.5" />
              <span>Importar JSON</span>
              <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
            </label>

            <button
              onClick={handleExportJson}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold min-h-[44px]"
              title="Descargar copia de seguridad de tus enlaces"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        {/* Product List with Link Inputs */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Consejo:</strong> Abre en otra pestaña el producto en Alcampo o Carrefour, copia la URL de la barra de direcciones y pégala aquí. La app la recordará siempre.
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="font-semibold text-slate-600">No hay productos que coincidan</p>
            </div>
          ) : (
            filtered.map((item) => {
              const key = item.name.toLowerCase().trim();
              const currentLink = linksMap[key] || {};
              const defaultAlcampo = `https://www.alcampo.es/compra-online/search?q=${encodeURIComponent(item.name)}`;
              const defaultCarrefour = `https://www.carrefour.es/supermercado/buscar?q=${encodeURIComponent(item.name)}`;

              return (
                <div
                  key={item.id}
                  className="bg-slate-50/70 rounded-xl border border-slate-200 p-3 sm:p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-slate-900">
                        {item.name}
                      </h4>
                      <span className="text-xs text-slate-500">
                        Cantidad necesaria: {item.amount} {item.unit}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {currentLink.alcampoUrl && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                          Alcampo Directo ✓
                        </span>
                      )}
                      {currentLink.carrefourUrl && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                          Carrefour Directo ✓
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Alcampo link input */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <label className="font-bold text-rose-700 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-rose-600 inline-block" />
                          Enlace Alcampo
                        </label>
                        {currentLink.alcampoUrl ? (
                          <a
                            href={currentLink.alcampoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-rose-600 hover:text-rose-800 flex items-center gap-0.5"
                          >
                            <span>Probar</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <a
                            href={defaultAlcampo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-slate-600 flex items-center gap-0.5"
                          >
                            <span>Buscar</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <input
                        type="url"
                        placeholder="https://www.alcampo.es/compra-online/producto/..."
                        value={currentLink.alcampoUrl || ''}
                        onChange={(e) => handleUpdateUrl(item.name, 'alcampo', e.target.value)}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-rose-400 min-h-[38px]"
                      />
                    </div>

                    {/* Carrefour link input */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <label className="font-bold text-blue-700 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                          Enlace Carrefour
                        </label>
                        {currentLink.carrefourUrl ? (
                          <a
                            href={currentLink.carrefourUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
                          >
                            <span>Probar</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <a
                            href={defaultCarrefour}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-slate-600 flex items-center gap-0.5"
                          >
                            <span>Buscar</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <input
                        type="url"
                        placeholder="https://www.carrefour.es/supermercado/..."
                        value={currentLink.carrefourUrl || ''}
                        onChange={(e) => handleUpdateUrl(item.name, 'carrefour', e.target.value)}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-blue-400 min-h-[38px]"
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="text-xs text-slate-500">
            {Object.keys(linksMap).length} productos personalizados
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold hover:bg-white min-h-[44px]"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition min-h-[44px]"
            >
              <Save className="w-4 h-4" />
              <span>{savedToast ? '¡Guardado!' : 'Guardar Enlaces'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
