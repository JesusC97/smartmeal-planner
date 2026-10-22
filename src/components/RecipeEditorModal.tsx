import React, { useState } from 'react';
import { Recipe, IngredientCategory } from '../types';
import { X, Plus, Trash2, ChefHat } from 'lucide-react';

interface RecipeEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveRecipe: (recipe: Recipe) => void;
}

export const RecipeEditorModal: React.FC<RecipeEditorModalProps> = ({
  isOpen,
  onClose,
  onSaveRecipe,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Recipe['category']>('verdura');
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(30);
  const [difficulty, setDifficulty] = useState<'Fácil' | 'Media' | 'Difícil'>('Fácil');
  const [servings, setServings] = useState(4);
  const [ingredients, setIngredients] = useState<
    { name: string; amount: number; unit: string; category: IngredientCategory }[]
  >([
    { name: '', amount: 1, unit: 'ud', category: 'verduras' },
  ]);
  const [instructions, setInstructions] = useState<string[]>(['']);

  if (!isOpen) return null;

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: 1, unit: 'ud', category: 'despensa' }]);
  };

  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length <= 1) return;
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleUpdateIngredient = (index: number, field: string, value: any) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const handleAddStep = () => {
    setInstructions([...instructions, '']);
  };

  const handleRemoveStep = (index: number) => {
    if (instructions.length <= 1) return;
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleUpdateStep = (index: number, text: string) => {
    const updated = [...instructions];
    updated[index] = text;
    setInstructions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const validIngredients = ingredients.filter((i) => i.name.trim() !== '');
    if (validIngredients.length === 0) return;

    const validInstructions = instructions.filter((s) => s.trim() !== '');

    const newRecipe: Recipe = {
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: name.trim(),
      description: description.trim() || 'Receta casera personalizada',
      category,
      prepTimeMinutes: Number(prepTimeMinutes) || 30,
      difficulty,
      servings: Number(servings) || 4,
      tags: ['Personalizada', category],
      ingredients: validIngredients,
      instructions: validInstructions.length > 0 ? validInstructions : ['Preparar los ingredientes y cocinar al gusto.'],
    };

    onSaveRecipe(newRecipe);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-4 sm:px-6 sm:py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-base sm:text-lg text-slate-900">
              Crear Nuevo Plato con sus Ingredientes
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Cerrar modal de creación de receta"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nombre del plato *
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Salteado de ternera con verduras al wok"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none min-h-[44px]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Descripción corta
              </label>
              <input
                type="text"
                placeholder="Breve resumen de cómo es el plato..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Categoría principal
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Recipe['category'])}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none min-h-[44px]"
              >
                <option value="verdura">Verdura / Ensalada</option>
                <option value="pescado">Pescado / Marisco</option>
                <option value="carne">Carne / Pollo</option>
                <option value="legumbre">Legumbre</option>
                <option value="pasta">Pasta</option>
                <option value="arroz">Arroz</option>
                <option value="huevos">Huevos</option>
                <option value="sopa">Sopa / Crema</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tiempo (min)
                </label>
                <input
                  type="number"
                  min="5"
                  value={prepTimeMinutes}
                  onChange={(e) => setPrepTimeMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dificultad
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none min-h-[44px]"
                >
                  <option value="Fácil">Fácil</option>
                  <option value="Media">Media</option>
                  <option value="Difícil">Difícil</option>
                </select>
              </div>
            </div>
          </div>

          {/* Ingredients Section (Mandatory list) */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-bold text-sm text-slate-900">
                  Ingredientes del plato *
                </h4>
                <p className="text-xs text-slate-500">
                  Estos ingredientes se sumarán a la lista de la compra semanal y a la comparativa Alcampo vs Carrefour.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir ingrediente</span>
              </button>
            </div>

            <div className="space-y-2">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Nombre (ej. Pechuga de pollo, Cebolla, Arroz...)"
                    value={ing.name}
                    onChange={(e) => handleUpdateIngredient(idx, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm min-h-[40px]"
                  />
                  <input
                    type="number"
                    step="any"
                    min="0.1"
                    placeholder="Cant."
                    value={ing.amount}
                    onChange={(e) => handleUpdateIngredient(idx, 'amount', parseFloat(e.target.value) || 1)}
                    className="w-16 px-2 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm min-h-[40px]"
                  />
                  <input
                    type="text"
                    placeholder="ud, g, ml..."
                    value={ing.unit}
                    onChange={(e) => handleUpdateIngredient(idx, 'unit', e.target.value)}
                    className="w-16 px-2 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm min-h-[40px]"
                  />
                  <select
                    value={ing.category}
                    onChange={(e) => handleUpdateIngredient(idx, 'category', e.target.value)}
                    className="w-28 px-2 py-2 border border-slate-300 rounded-xl text-xs bg-white min-h-[40px]"
                  >
                    <option value="verduras">Verdura</option>
                    <option value="carnes">Carne</option>
                    <option value="pescados">Pescado</option>
                    <option value="lacteos">Lácteo/Huevo</option>
                    <option value="legumbres">Legumbre</option>
                    <option value="despensa">Despensa</option>
                    <option value="panaderia">Panadería</option>
                    <option value="frutas">Fruta</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(idx)}
                    disabled={ingredients.length <= 1}
                    className="p-2 text-slate-400 hover:text-rose-600 disabled:opacity-30 min-h-[40px] min-w-[40px] flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-50 min-h-[44px]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs min-h-[44px]"
            >
              Guardar Plato en el Recetario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
