import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  fetchDrinkRecommendations,
  fetchMealsRecommendations,
} from '../../api/fetchRecomedations';
import { getIngredientsAndMesures } from '../../helpers/getIngredientsAndMesures';
import { Drink, Meal } from '../../types';

import DrinkRecipeDetails from '../../components/DrinkRecipeDetails';
import MealRecipeDetails from '../../components/MealRecipeDetails';

import styles from './recipe.module.css';

function RecipeDetails() {
  const [mealRecipe, setMealRecipe] = useState<Meal>({} as Meal);
  const [drinkRecipe, setDrinkRecipe] = useState<Drink>({} as Drink);
  const [mealsRecomendation, setMealsRecomendations] = useState<Meal[]>([]);
  const [drinksRecomendation, setDrinksRecomendations] = useState<Drink[]>([]);
  const [recipeStatus, setRecipeStatus] = useState(false);
  const { pathname } = useLocation();
  const { id } = useParams();
  const currentPage = pathname.split('/')[1];
  const navigate = useNavigate();
  const apiTarget = currentPage === 'meals' ? 'themealdb' : 'thecocktaildb';
  const apiUrl = `https://www.${apiTarget}.com/api/json/v1/1/lookup.php?i=${id}`;

  const fetchRecipeDetail = useCallback(async () => {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('Error');
      }

      const recipeData = await response.json();

      return currentPage === 'meals'
        ? setMealRecipe(recipeData.meals[0])
        : setDrinkRecipe(recipeData.drinks[0]);
    } catch (error) {
      console.error(error);
    }
  }, [currentPage, apiUrl]);

  const checkAndUpdateRecipeStatus = useCallback(() => {
    const inProgressRecipesJSON = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipesJSON) {
      const inProgressRecipes = JSON.parse(inProgressRecipesJSON);

      const recipeKey = currentPage === 'meals' ? 'meals' : 'drinks';

      const recipeId = id ? id.toString() : '';

      if (inProgressRecipes[recipeKey] && inProgressRecipes[recipeKey][recipeId]) {
        setRecipeStatus(true);
      }
    }
  }, [currentPage, id]);

  const handleStartRecipe = useCallback(() => {
    setRecipeStatus(true);
    navigate(`/${currentPage}/${id}/in-progress`);
  }, [navigate, currentPage, id]);

  useEffect(() => {
    fetchRecipeDetail();

    const fetchRecommendations = async () => {
      const recommendations = currentPage === 'meals'
        ? await fetchDrinkRecommendations()
        : await fetchMealsRecommendations();
      if (currentPage === 'meals') {
        setDrinksRecomendations(recommendations);
      } else {
        setMealsRecomendations(recommendations);
      }
    };
    fetchRecommendations();
    checkAndUpdateRecipeStatus();
  }, [fetchRecipeDetail, currentPage, checkAndUpdateRecipeStatus]);

  const ingredients = getIngredientsAndMesures(
    currentPage === 'meals'
      ? mealRecipe
      : drinkRecipe,
    'strIngredient',
  ) as string[];

  const measure = getIngredientsAndMesures(
    currentPage === 'meals'
      ? mealRecipe
      : drinkRecipe,
    'strMeasure',
  ) as string[];

  return (
    <section className={ styles.recipe_container }>
      { currentPage === 'meals' && mealRecipe && (
        <MealRecipeDetails
          mealRecipe={ mealRecipe }
          ingredients={ ingredients }
          measure={ measure }
          drinksRecomendation={ drinksRecomendation }
        />
      )}
      { currentPage === 'drinks' && drinkRecipe && (

        <DrinkRecipeDetails
          drinkRecipe={ drinkRecipe }
          ingredients={ ingredients }
          measure={ measure }
          mealsRecomendation={ mealsRecomendation }
        />
      )}
      <button
        data-testid="start-recipe-btn"
        className={ styles.start_recipe_button }
        onClick={ handleStartRecipe }
      >
        {recipeStatus ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </section>

  );
}
export default RecipeDetails;
