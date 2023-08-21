import { createContext, useState } from 'react';
import { Drink, Meal, RecipesContextType, RecipesProviderProps } from '../types';

export const recipesContext = createContext({} as RecipesContextType);

export function RecipesProvider({ children }: RecipesProviderProps) {
  const [recipes, setRecipes] = useState<Meal[] | Drink[]>([]);

  return (
    <recipesContext.Provider value={ { recipes, setRecipes } }>
      {children}
    </recipesContext.Provider>
  );
}
