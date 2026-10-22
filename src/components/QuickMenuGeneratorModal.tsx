import React, { useState } from 'react';
import { Recipe, WeeklyPlan, DayOfWeek } from '../types';
import { Sparkles, X, Check, Flame, Clock, Heart, DollarSign } from 'lucide-react';

interface QuickMenuGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: Recipe[];
  onApplyPlan: (newPlan: WeeklyPlan) => void;
}

export const QuickMenuGeneratorModal: React.FC<QuickMenuGeneratorModalProps> = ({
  isOpen,
  onClose,
  recipes,
  onApplyPlan,
}) => {
  const [selectedStyle, setSelectedStyle] = useState<string>('mediterranean');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const styles = [
    {
      id: 'mediterranean',
      title: 'Dieta Mediterránea Equilibrada',
      desc: '2 días legumbres, 3 días pescado, verduras variadas, huevos camperos y carnes magras.',
      icon: '🥗',
      badge: 'Recomendado',
    },
    {
      id: 'express',
      title: 'Rápido & Express (< 30 min)',
      desc: 'Platos sencillos y cenas ligeras que no te quitan tiempo entre semana.',
      icon: '⚡',
      badge: 'Menos tiempo',
    },
    {
      id: 'economic',
      title: 'Menú Económico Ahorro Máximo',
      desc: 'Optimizado con ingredientes accesibles para reducir tu ticket en Alcampo y Carrefour.',
      icon: '💶',
      badge: 'Más barato',
    },
    {
      id: 'fitness',
      title: 'Saludable & Alto en Proteína',
      desc: 'Prioriza pescados, pechuga de pollo, ensaladas camperas y platos ligeros para la cena.',
      icon: '🥑',
      badge: 'Fitness',
    },
  ];

  const handleGenerate = () => {
    setLoading(true);

    setTimeout(() => {
      // Intelligent deterministic weekly generator based on styles
      const days: DayOfWeek[] = [
        'lunes',
        'martes',
        'miercoles',
        'jueves',
        'viernes',
        'sabado',
        'domingo',
      ];

      const getRecipeByCategory = (cat: string) => {
        const matching = recipes.filter((r) => r.category === cat);
        return matching.length > 0
          ? matching[Math.floor(Math.random() * matching.length)]
          : recipes[0];
      };

      const getQuickRecipe = () => {
        const quick = recipes.filter((r) => r.prepTimeMinutes <= 25);
        return quick.length > 0 ? quick[Math.floor(Math.random() * quick.length)] : recipes[1];
      };

      const newPlan: WeeklyPlan = {
        lunes: { almuerzo: null, cena: null },
        martes: { almuerzo: null, cena: null },
        miercoles: { almuerzo: null, cena: null },
        jueves: { almuerzo: null, cena: null },
        viernes: { almuerzo: null, cena: null },
        sabado: { almuerzo: null, cena: null },
        domingo: { almuerzo: null, cena: null },
      };

      if (selectedStyle === 'express') {
        days.forEach((day) => {
          newPlan[day] = {
            almuerzo: getQuickRecipe(),
            cena: getQuickRecipe(),
          };
        });
      } else if (selectedStyle === 'economic') {
        // Legumes and eggs are very economical!
        newPlan.lunes = { almuerzo: getRecipeByCategory('legumbre'), cena: getRecipeByCategory('huevos') };
        newPlan.martes = { almuerzo: getRecipeByCategory('pasta'), cena: getRecipeByCategory('sopa') };
        newPlan.miercoles = { almuerzo: getRecipeByCategory('verdura'), cena: getRecipeByCategory('huevos') };
        newPlan.jueves = { almuerzo: getRecipeByCategory('legumbre'), cena: getRecipeByCategory('sopa') };
        newPlan.viernes = { almuerzo: getRecipeByCategory('arroz'), cena: getRecipeByCategory('verdura') };
        newPlan.sabado = { almuerzo: getRecipeByCategory('carne'), cena: getRecipeByCategory('huevos') };
        newPlan.domingo = { almuerzo: getRecipeByCategory('pescado'), cena: getRecipeByCategory('sopa') };
      } else {
        // Mediterranean balanced
        newPlan.lunes = { almuerzo: getRecipeByCategory('legumbre'), cena: getRecipeByCategory('pescado') };
        newPlan.martes = { almuerzo: getRecipeByCategory('pasta'), cena: getRecipeByCategory('sopa') };
        newPlan.miercoles = { almuerzo: getRecipeByCategory('carne'), cena: getRecipeByCategory('verdura') };
        newPlan.jueves = { almuerzo: getRecipeByCategory('legumbre'), cena: getRecipeByCategory('huevos') };
        newPlan.viernes = { almuerzo: getRecipeByCategory('pescado'), cena: getRecipeByCategory('carne') };
        newPlan.sabado = { almuerzo: getRecipeByCategory('arroz'), cena: getRecipeByCategory('verdura') };
        newPlan.domingo = { almuerzo: getRecipeByCategory('pescado'), cena: getRecipeByCategory('sopa') };
      }

      onApplyPlan(newPlan);
      setLoading(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200">
        <div className="p-4 sm:px-6 sm:py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-base sm:text-lg text-slate-900">
              Generador Inteligente de Menú
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Cerrar generador de menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <p className="text-xs sm:text-sm text-slate-600">
            Completa de un solo toque los 7 días de la semana con 14 comidas bien organizadas. Podrás personalizar cualquier plato después.
          </p>

          <div className="space-y-2.5">
            {styles.map((style) => (
              <div
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center gap-3.5 ${
                  selectedStyle === style.id
                    ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-2xl">{style.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{style.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {style.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{style.desc}</p>
                </div>
                {selectedStyle === style.id && (
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs sm:text-sm font-semibold hover:bg-slate-50 min-h-[44px]"
            >
              Cancelar
            </button>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2 transition min-h-[44px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Generando menú...' : 'Generar y Aplicar Menú'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
