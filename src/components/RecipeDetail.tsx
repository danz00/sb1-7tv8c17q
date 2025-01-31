import { ArrowLeft } from 'lucide-react';
import { Recipe, Category } from '../types';

interface RecipeDetailProps {
  recipe: Recipe;
  category?: Category;
  onBack: () => void;
}

export function RecipeDetail({ recipe, category, onBack }: RecipeDetailProps) {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar
        </button>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.name}</h1>
            {category && (
              <p className="text-gray-600">Categoria: {category.name}</p>
            )}
          </div>

          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-96 object-cover rounded-lg"
          />

          <div>
            <h2 className="text-2xl font-semibold mb-4">Ingredientes</h2>
            <ul className="list-disc pl-5 space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Modo de Preparo</h2>
            <ol className="list-decimal pl-5 space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-gray-700">{instruction}</li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Informação Nutricional</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Calorias</p>
                <p className="text-xl font-semibold">{recipe.nutritionalInfo.calories}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Proteínas</p>
                <p className="text-xl font-semibold">{recipe.nutritionalInfo.proteins}g</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Carboidratos</p>
                <p className="text-xl font-semibold">{recipe.nutritionalInfo.carbs}g</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Gorduras</p>
                <p className="text-xl font-semibold">{recipe.nutritionalInfo.fats}g</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}