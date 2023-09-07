import { useEffect, useState } from 'react';
import { Drink, Meal } from '../types';

export const useRecomendation = (
  type:string,
) => {
  const [mealRecomendation, setMealRecomendation] = useState< Drink[]>([]);
  const [drinkRecomendation, setDrinkRecomendation] = useState< Meal[]>([]);
  useEffect(() => {
    const mealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const drinskUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const fetchData = async () => {
      const response = await fetch(type === 'meals' ? drinskUrl : mealsUrl);

      const data = await response.json();

      if (type === 'meals' && data && data.drinks) {
        setMealRecomendation(data.drinks);
        setDrinkRecomendation([]);
      }
      if (type === 'drinks' && data && data.meals) {
        setDrinkRecomendation(data.meals);
        setMealRecomendation([]);
      }
    };
    fetchData();
  }, [type]);
  return { mealRecomendation, drinkRecomendation };
};
