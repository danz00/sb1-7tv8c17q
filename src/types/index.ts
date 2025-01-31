export interface Category {
  id: string;
  name: string;
}

export interface NutritionalInfo {
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

export interface Recipe {
  id: string;
  categoryId: string;
  name: string;
  imageUrl: string;
  ingredients: string[];
  instructions: string[];
  nutritionalInfo: NutritionalInfo;
  created_at: string;
  updated_at: string;
}

export type RecipeFormData = Omit<Recipe, 'id' | 'created_at' | 'updated_at'>;
export type RecipeUpdateData = Omit<Recipe, 'created_at' | 'updated_at'>;