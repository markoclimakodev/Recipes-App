import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  fetchDrinkRecommendations,
  fetchMealsRecommendations,
} from '../../api/fetchRecomedations';
import { getIngredientsAndMesures } from '../../helpers/getIngredientsAndMesures';
import { Drink, Meal } from '../../types';

import styles from './recipe.module.css';

function RecipeDetails() {
  const [mealRecipe, setMealRecipe] = useState<Meal>({} as Meal);
  const [drinkRecipe, setDrinkRecipe] = useState<Drink>({} as Drink);
  const [mealsRecomendation, setMealsRecomendations] = useState<Meal[]>([]);
  const [drinksRecomendation, setDrinksRecomendations] = useState<Drink[]>([]);

  const { pathname } = useLocation();
  const { id } = useParams();
  const currentPage = pathname.split('/')[1];

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
  }, [fetchRecipeDetail, currentPage]);

  const ingredients = getIngredientsAndMesures(
    currentPage === 'meals'
      ? mealRecipe
      : drinkRecipe,
    'strIngredient',
  );

  const mesures = getIngredientsAndMesures(
    currentPage === 'meals'
      ? mealRecipe
      : drinkRecipe,
    'strMeasure',
  );

  console.log(mealsRecomendation);
  return (
    <>
      { currentPage === 'meals' && mealRecipe && (
        <section className={ styles.recipe_container }>
          <section className={ styles.category_container }>
            <p
              data-testid="recipe-category"
              className={ styles.category_name }
            >
              {mealRecipe.strCategory}

            </p>
          </section>
          <img
            src={ mealRecipe.strMealThumb }
            alt={ mealRecipe.strMeal }
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">
            {mealRecipe.strMeal}
          </h2>
          <ul>
            {
            ingredients && mesures && ingredients.map((ingredient, index) => (
              <li
                key={ Date.now() + index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient}
                {' '}
                -
                {' '}
                {mesures[index]}
              </li>
            ))
          }
          </ul>

          <p data-testid="instructions">
            {mealRecipe.strInstructions}
          </p>

          {
      mealRecipe.strYoutube && (
        <iframe
          width="560"
          height="315"
          src={ mealRecipe.strYoutube }
          title="YouTube video player"
          data-testid="video"
        />
      )
     }
          <h2>Recommended</h2>
          <section className={ styles.carousel }>
            { drinksRecomendation && drinksRecomendation.slice(0, 6)
              .map((drink:Drink, index) => (
                <section
                  key={ drink.idDrink }
                  data-testid={ `${index}-recommendation-card` }
                  className={ styles.card }
                >
                  <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
                  <h3
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {drink.strDrink}

                  </h3>
                </section>
              ))}
          </section>
          <button
            className={ styles.start_recipe_button }
            data-testid="start-recipe-btn"
          >
            start recipe
          </button>
        </section>
      )}
      { currentPage === 'drinks' && drinkRecipe && (
        <section
          className={ styles.recipe_container }
        >
          <p
            data-testid="recipe-category"
            className={ styles.category }
          >
            {drinkRecipe.strAlcoholic}

          </p>
          <img
            src={ drinkRecipe.strDrinkThumb }
            alt={ drinkRecipe.strDrink }
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">
            {drinkRecipe.strDrink}
          </h2>
          <ul>
            {
            ingredients && mesures && ingredients.map((ingredient, index) => (
              <li
                key={ Date.now() + index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient}
                {' '}
                -
                {' '}
                {mesures[index]}
              </li>
            ))
          }
          </ul>

          <p data-testid="instructions">
            {drinkRecipe.strInstructions}
          </p>

          <h2>Recommended</h2>
          <section className={ styles.carousel }>
            {mealsRecomendation && mealsRecomendation.slice(0, 6)
              .map((meal: Meal, index) => (
                <section
                  key={ meal.idMeal }
                  data-testid={ `${index}-recommendation-card` }
                  className={ styles.card }
                >
                  <img src={ meal.strMealThumb } alt={ meal.strMeal } />
                  <h3 data-testid={ `${index}-recommendation-title` }>
                    {meal.strMeal}
                  </h3>
                </section>
              ))}
          </section>
          <button
            data-testid="start-recipe-btn"
            className={ styles.start_recipe_button }
          >
            start recipe
          </button>
        </section>
      )}
    </>

  );
}

export default RecipeDetails;
