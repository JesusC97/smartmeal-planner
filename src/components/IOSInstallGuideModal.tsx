import React, { useState } from 'react';
import {
  X,
  Share,
  PlusSquare,
  Sparkles,
  CheckCircle2,
  Apple,
  Smartphone,
  Tablet,
  MoreVertical,
  Download,
} from 'lucide-react';

interface IOSInstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDevice?: 'ios' | 'android';
}

export const IOSInstallGuideModal: React.FC<IOSInstallGuideModalProps> = ({
  isOpen,
  onClose,
  defaultDevice = 'ios',
}) => {
  const [deviceTab, setDeviceTab] = useState<'ios' | 'android'>(defaultDevice);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto safe-bottom"
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-modal-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-xs">
              {deviceTab === 'ios' ? <Apple className="w-6 h-6" /> : <Tablet className="w-6 h-6" />}
            </div>
            <div>
              <h3 id="install-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
                Instalar como Aplicación
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                PWA para iPhone, iPad y Tablet Android
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Cerrar guía"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Device Switcher Pills */}
        <div className="grid grid-cols-2 gap-2 p-1 mt-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setDeviceTab('ios')}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition min-h-[40px] ${
              deviceTab === 'ios'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Apple className="w-4 h-4" />
            <span>Móvil iPhone / iPad</span>
          </button>

          <button
            onClick={() => setDeviceTab('android')}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition min-h-[40px] ${
              deviceTab === 'android'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Tablet / Android</span>
          </button>
        </div>

        {/* Device Steps */}
        {deviceTab === 'ios' ? (
          <div className="py-4 space-y-3.5">
            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold text-sm">
                1
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  Pulsa en Compartir
                  <Share className="w-4 h-4 text-blue-500 inline-block" />
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  En la barra inferior de Safari en tu iPhone, toca el icono cuadrado con la flecha hacia arriba.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-sm">
                2
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  Elige "Añadir a la pantalla de inicio"
                  <PlusSquare className="w-4 h-4 text-emerald-500 inline-block" />
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Desplaza el menú hacia abajo y selecciona la opción con el símbolo más (+).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 font-bold text-sm">
                3
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  Confirma con "Añadir"
                  <CheckCircle2 className="w-4 h-4 text-purple-500 inline-block" />
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  En la esquina superior derecha pulsa "Añadir" y el icono aparecerá en tu iPhone como una app nativa.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-3.5">
            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-sm">
                1
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  Menú de opciones (tres puntos)
                  <MoreVertical className="w-4 h-4 text-emerald-500 inline-block" />
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  En Google Chrome en tu tablet Android, pulsa el botón de los 3 puntos arriba a la derecha.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold text-sm">
                2
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  Pulsa "Instalar aplicación"
                  <Download className="w-4 h-4 text-blue-500 inline-block" />
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  O pulsa directamente el botón "Instalar" en la barra superior de esta app.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 font-bold text-sm">
                3
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  ¡Listo! Modo tablet nativo
                  <CheckCircle2 className="w-4 h-4 text-purple-500 inline-block" />
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Tendrás el icono en tu pantalla de inicio y se abrirá a pantalla completa adaptada a tu tablet.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Advantages */}
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold text-xs mb-1">
            <Sparkles className="w-4 h-4" />
            Experiencia PWA Completa
          </div>
          <p className="text-xs text-emerald-700 dark:text-emerald-400">
            Sin ocupar espacio en tu memoria de aplicaciones y guardando tus recetas y enlaces personalizados directamente en el dispositivo.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:opacity-90 transition active:scale-98"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
