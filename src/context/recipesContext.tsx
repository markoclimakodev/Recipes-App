import { createContext, useCallback, useEffect, useState } from 'react';
import {
  DoneRecipesType,
  Drink,
  FavoriteType,
  Meal,
  RecipesContextType,
  RecipesProviderProps,
} from '../types';

export const RecipesContext = createContext({} as RecipesContextType);

export function RecipesProvider({ children }: RecipesProviderProps) {
  const [recipes, setRecipes] = useState<Meal[] | Drink[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteType[]>([]);
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipesType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedDoneRecipes = localStorage.getItem('doneRecipes');
    if (storedDoneRecipes) {
      const doneRecipesList = JSON.parse(storedDoneRecipes);
      setDoneRecipes(doneRecipesList);
    }
    const storedFavoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (storedFavoriteRecipes) {
      const favoritedRecipes = JSON.parse(storedFavoriteRecipes);
      setFavoriteRecipes(favoritedRecipes);
    }
  }, []);

  const handleDoneRecipes = (newDoneRecipe:DoneRecipesType) => {
    setDoneRecipes([...doneRecipes, newDoneRecipe]);
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([...doneRecipes, newDoneRecipe]),
    );
  };

  const handleLoading = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const handleFavoriteRecipes = (newFavoriteRecipe:FavoriteType) => {
    setFavoriteRecipes([...favoriteRecipes, newFavoriteRecipe]);
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...favoriteRecipes, newFavoriteRecipe]),
    );
  };

  const handleRemoveFavoriteRecipe = (recipeId:string) => {
    const updatedFavoriteRecipes = favoriteRecipes
      .filter((recipe) => recipe.id !== recipeId);
    setFavoriteRecipes(updatedFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
  };

  const providerValues = {
    recipes,
    setRecipes,
    favoriteRecipes,
    doneRecipes,
    loading,
    handleFavoriteRecipes,
    handleRemoveFavoriteRecipe,
    handleDoneRecipes,
    handleLoading,
  };
  return (
    <RecipesContext.Provider value={ providerValues }>
      {children}
    </RecipesContext.Provider>
  );
}
