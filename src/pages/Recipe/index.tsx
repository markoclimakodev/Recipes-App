import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getIngredientsAndMesures } from '../../helpers/getIngredientsAndMesures';
import { Drink, Meal } from '../../types';

function Recipe() {
  const [mealRecipe, setMealRecipe] = useState<Meal>({} as Meal);
  const [drinkRecipe, setDrinkRecipe] = useState<Drink>({} as Drink);

  const { pathname } = useLocation();
  const { id } = useParams();
  const currentPage = pathname.split('/')[1];

  const fetchRecipeDetail = useCallback(async () => {
    try {
      const apiTarget = currentPage === 'meals' ? 'themealdb' : 'thecocktaildb';
      const apiUrl = `https://www.${apiTarget}.com/api/json/v1/1/lookup.php?i=${id}`;

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
  }, [currentPage, id]);

  useEffect(() => {
    fetchRecipeDetail();
  }, [fetchRecipeDetail]);

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

  console.log(drinkRecipe);
  return (
    <>
      { currentPage === 'meals' && mealRecipe && (
        <section>
          <p
            data-testid="recipe-category"
          >
            {mealRecipe.strCategory}

          </p>
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
                key={ ingredient }
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

        </section>
      )}
      { currentPage === 'drinks' && drinkRecipe && (
        <section>
          <p
            data-testid="recipe-category"
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
                key={ ingredient }
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

        </section>
      )}
    </>

  );
}

export default Recipe;
