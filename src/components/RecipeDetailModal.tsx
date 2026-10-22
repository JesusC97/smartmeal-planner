import React, { useState } from 'react';
import { Recipe, IngredientItem } from '../types';
import {
  X,
  Clock,
  ChefHat,
  Users,
  Edit3,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Check,
  Plus,
  Trash2,
} from 'lucide-react';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  servingsMultiplier: number;
  onUpdateRecipeIngredients?: (recipeId: string, updatedIngredients: Recipe['ingredients']) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  isOpen,
  onClose,
  servingsMultiplier,
  onUpdateRecipeIngredients,
}) => {
  const [cookingMode, setCookingMode] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  // Editing ingredients mode
  const [isEditing, setIsEditing] = useState(false);
  const [editableIngredients, setEditableIngredients] = useState<Recipe['ingredients']>([]);
  const [newIngName, setNewIngName] = useState('');
  const [newIngAmount, setNewIngAmount] = useState('100');
  const [newIngUnit, setNewIngUnit] = useState('g');

  if (!isOpen || !recipe) return null;

  const toggleIngredientCheck = (key: string) => {
    setCheckedIngredients((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleStepCheck = (index: number) => {
    setCheckedSteps((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const startEditing = () => {
    setEditableIngredients([...recipe.ingredients]);
    setIsEditing(true);
  };

  const handleSaveIngredients = () => {
    if (onUpdateRecipeIngredients) {
      onUpdateRecipeIngredients(recipe.id, editableIngredients);
    }
    setIsEditing(false);
  };

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIngName.trim()) return;
    setEditableIngredients([
      ...editableIngredients,
      {
        name: newIngName.trim(),
        amount: parseFloat(newIngAmount) || 1,
        unit: newIngUnit.trim() || 'ud',
        category: 'despensa',
      },
    ]);
    setNewIngName('');
    setNewIngAmount('100');
  };

  const handleRemoveIngredient = (index: number) => {
    setEditableIngredients(editableIngredients.filter((_, i) => i !== index));
  };

  const baseServings = recipe.servings || 4;
  const currentServings = Math.round(baseServings * servingsMultiplier);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`bg-white rounded-2xl w-full flex flex-col shadow-2xl overflow-hidden border border-slate-200 transition-all ${
          cookingMode ? 'max-w-4xl max-h-[95vh]' : 'max-w-2xl max-h-[90vh]'
        }`}
      >
        {/* Header */}
        <div className="p-4 sm:px-6 sm:py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
              {recipe.category}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {recipe.difficulty} • {recipe.prepTimeMinutes} min
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Tablet Kitchen Cooking Mode Button */}
            <button
              onClick={() => setCookingMode(!cookingMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition min-h-[40px] ${
                cookingMode
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
              title="Activar vista para cocinar en la tablet con texto grande y pasos"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{cookingMode ? 'Modo Normal' : 'Modo Cocina Tablet'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Cerrar detalles de receta"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Recipe Title & Subtitle */}
        <div className="p-4 sm:px-6 pt-4 pb-2 bg-white">
          <h2
            className={`font-black text-slate-900 tracking-tight ${
              cookingMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
            }`}
          >
            {recipe.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">{recipe.description}</p>

          <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <Users className="w-4 h-4 text-emerald-600" />
              Raciones calculadas: {currentServings} personas
            </span>
            <span>•</span>
            <span>{recipe.ingredients.length} ingredientes</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:px-6 overflow-y-auto flex-1 space-y-6">
          {/* Section: Associated Ingredients */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-emerald-600" />
                <span>Ingredientes necesarios</span>
              </h3>

              {!isEditing && onUpdateRecipeIngredients && (
                <button
                  onClick={startEditing}
                  className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-800 py-1 px-2 rounded-md hover:bg-emerald-50"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Personalizar ingredientes</span>
                </button>
              )}
            </div>

            {isEditing ? (
              /* Editing mode */
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <ul className="space-y-2">
                  {editableIngredients.map((ing, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between gap-2 p-2 bg-white rounded-lg border border-slate-200 text-xs"
                    >
                      <span className="font-semibold text-slate-900 flex-1">{ing.name}</span>
                      <span className="text-slate-600 font-bold">
                        {ing.amount} {ing.unit}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Add ingredient inline */}
                <form onSubmit={handleAddIngredient} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Nuevo ingrediente..."
                    value={newIngName}
                    onChange={(e) => setNewIngName(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                  <input
                    type="number"
                    step="any"
                    value={newIngAmount}
                    onChange={(e) => setNewIngAmount(e.target.value)}
                    className="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={newIngUnit}
                    onChange={(e) => setNewIngUnit(e.target.value)}
                    className="w-14 px-2 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                  >
                    Añadir
                  </button>
                </form>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-600"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveIngredients}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                  >
                    Guardar cambios
                  </button>
                </div>
              </div>
            ) : (
              /* View ingredients list */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recipe.ingredients.map((ing, idx) => {
                  const scaledAmount = Number((ing.amount * servingsMultiplier).toFixed(2));
                  const isChecked = !!checkedIngredients[ing.name];

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleIngredientCheck(ing.name)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition cursor-pointer select-none ${
                        isChecked
                          ? 'bg-emerald-50/50 border-emerald-300 text-slate-400 line-through'
                          : 'bg-slate-50 border-slate-200/90 text-slate-800 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                            isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className={`text-xs sm:text-sm font-medium ${cookingMode ? 'text-base' : ''}`}>
                          {ing.name}
                        </span>
                      </div>

                      <span className="text-xs sm:text-sm font-bold text-slate-900 shrink-0">
                        {scaledAmount} {ing.unit}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section: Preparation instructions */}
          {recipe.instructions && recipe.instructions.length > 0 && (
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Preparación paso a paso</span>
              </h3>

              <ol className="space-y-3">
                {recipe.instructions.map((step, idx) => {
                  const isDone = !!checkedSteps[idx];
                  return (
                    <li
                      key={idx}
                      onClick={() => toggleStepCheck(idx)}
                      className={`p-3.5 rounded-xl border transition cursor-pointer flex gap-3 ${
                        isDone
                          ? 'bg-slate-50 border-slate-200 opacity-60'
                          : 'bg-white border-slate-200 hover:border-emerald-300 shadow-2xs'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-900 text-white'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </span>
                      <p
                        className={`text-xs sm:text-sm text-slate-800 leading-relaxed ${
                          cookingMode ? 'text-base sm:text-lg font-medium' : ''
                        } ${isDone ? 'line-through text-slate-400' : ''}`}
                      >
                        {step}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
