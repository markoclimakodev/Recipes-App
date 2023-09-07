import { useEffect, useState } from 'react';
import { Drink, Meal } from '../types';

const recipeInitalData = {} as Meal | Drink;

export const useRecipeDetails = (
  type:string,
  id:string,
) => {
  const [recipe, setRecipe] = useState(recipeInitalData);
  useEffect(() => {
    const mealUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const drinksUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const fetchData = async () => {
      const response = await fetch(type === 'meals' ? mealUrl : drinksUrl);
      const data = await response.json();
      if (data) {
        const recipeDetails = type === 'meals' ? data.meals[0] : data.drinks[0];
        setRecipe(recipeDetails);
      }
    };
    fetchData();
  }, [id, type]);
  return recipe;
};
