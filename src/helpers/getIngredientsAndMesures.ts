import { Drink, Meal } from '../types';

export const getIngredientsAndMesures = (recipe: Meal | Drink, property: string) => {
  return Object.keys(recipe)
    .filter((key) => key.startsWith(property) && recipe[key as keyof (Meal | Drink)])
    .map((key) => recipe[key as keyof (Meal | Drink)]);
};
