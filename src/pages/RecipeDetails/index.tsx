import { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getIngredientsAndMesures } from '../../helpers/getIngredientsAndMesures';
import { Drink, FavoriteType, Meal } from '../../types';

import DrinkRecipeDetails from '../../components/DrinkRecipeDetails';
import MealRecipeDetails from '../../components/MealRecipeDetails';

import { RecipesContext } from '../../context/recipesContext';
import styles from './recipe.module.css';

function RecipeDetails() {
  const [mealRecipe, setMealRecipe] = useState<Meal>({} as Meal);
  const [drinkRecipe, setDrinkRecipe] = useState<Drink>({} as Drink);
  const [recommendations, setRecommendations] = useState<Meal[] | Drink[]>([]);
  const [recipeStatus, setRecipeStatus] = useState(false);
  const {
    favoriteRecipes,
    handleFavoriteRecipes,
    handleRemoveFavoriteRecipe,
  } = useContext(RecipesContext);
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

  const handleCopyToClipBoard = useCallback(async () => {
    const recipeDetailsLink = `http://localhost:3000${pathname}`;
    await navigator.clipboard.writeText(recipeDetailsLink);
    Swal.fire({
      position: 'center',
      title: 'Link copied!',
      showConfirmButton: false,
      timer: 1000,
      width: '200px',
      heightAuto: false,
    });
  }, [pathname]);

  const handleFavoriteRecipe = () => {
    let recipeToFavorite:FavoriteType = {} as FavoriteType;

    if (currentPage === 'meals') {
      recipeToFavorite = {
        id: id || '',
        type: 'meal',
        nationality: mealRecipe.strArea,
        category: mealRecipe.strCategory,
        alcoholicOrNot: '',
        name: mealRecipe.strMeal,
        image: mealRecipe.strMealThumb,
      };
    }

    if (currentPage === 'drinks') {
      recipeToFavorite = {
        id: id || '',
        type: 'drink',
        nationality: '',
        category: drinkRecipe.strCategory,
        alcoholicOrNot: drinkRecipe.strAlcoholic,
        name: drinkRecipe.strDrink,
        image: drinkRecipe.strDrinkThumb,
      };
    }

    const isRecipeAlreadyFavorited = favoriteRecipes
      .some((recipe) => recipe.id === recipeToFavorite.id);
    if (isRecipeAlreadyFavorited) {
      handleRemoveFavoriteRecipe(recipeToFavorite.id);
    }
    if (!isRecipeAlreadyFavorited) {
      handleFavoriteRecipes(recipeToFavorite);
    }
  };

  const fetchRecommendations = useCallback(async (url:string) => {
    try {
      const recommendationsResponse = await fetch(url);

      if (!recommendationsResponse.ok) {
        throw new Error('Error');
      }

      const recommendationsData = await recommendationsResponse.json();
      return recommendationsData.drinks || recommendationsData.meals;
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchRecipeDetail();

    const fetchRecommendationsData = async () => {
      const url = currentPage === 'meals'
        ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
        : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

      const recommendation = await fetchRecommendations(url);
      setRecommendations(recommendation);
    };

    fetchRecommendationsData();
    checkAndUpdateRecipeStatus();
  }, [
    fetchRecipeDetail,
    currentPage,
    checkAndUpdateRecipeStatus,
    fetchRecommendations,
  ]);

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
          drinksRecomendation={ recommendations as Drink[] }
          handleCopyToClipBoard={ handleCopyToClipBoard }
          handleFavorite={ handleFavoriteRecipe }
        />
      )}
      { currentPage === 'drinks' && drinkRecipe && (

        <DrinkRecipeDetails
          drinkRecipe={ drinkRecipe }
          ingredients={ ingredients }
          measure={ measure }
          mealsRecomendation={ recommendations as Meal[] }
          handleCopyToClipBoard={ handleCopyToClipBoard }
          handleFavorite={ handleFavoriteRecipe }
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