import { useState, useEffect } from 'react';
import { Recipe, Category, RecipeFormData } from '../types';

interface RecipeFormProps {
  categories: Category[];
  initialData?: Recipe | null;
  onSubmit: (recipe: RecipeFormData) => void;
  onCancel: () => void;
}

// ... resto do código do RecipeForm permanece igual