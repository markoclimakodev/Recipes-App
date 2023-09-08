import { useCallback, useContext, useEffect, useState } from 'react';
import { BiFoodMenu } from 'react-icons/bi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import YouTube, { YouTubeProps } from 'react-youtube';
import { RecipesContext } from '../../context/recipesContext';
import { getIngredientsAndMesures } from '../../helpers/getIngredientsAndMesures';
import { useRecipeDetails } from '../../hooks/useRecipeDetails';
import { useRecomendation } from '../../hooks/useRecomendation';
import { Drink, FavoriteType, Meal } from '../../types';
import ActionButtons from '../ActionButtons';
import CopyAlert from '../CopyAlert';

import favoritedIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/whiteHeartIcon.svg';

import styles from '../../pages/RecipeDetails/recipe.module.css';
import MealRecomentation from '../MealRecomendation';

type MealDetailsType = {
  type: string
};

function MealDetails({ type }:MealDetailsType) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const recipe = useRecipeDetails(type, id || '');
  const navigate = useNavigate();

  const [meal, setMeal] = useState<Meal>();

  const { mealRecomendation } = useRecomendation(type);

  const [copyLink, setCopyLink] = useState(false);
  const { favoriteRecipes, handleFavoriteRecipes, handleRemoveFavoriteRecipe,
  } = useContext(RecipesContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipeStatus, setRecipeStatus] = useState(false);

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '100%',
  };

  useEffect(() => {
    if (type === 'meals') {
      setMeal(recipe as Meal);
    }
  }, [type, recipe]);

  const title = meal?.strMeal;
  const image = meal?.strMealThumb;
  const category = meal?.strCategory;
  const instructions = meal?.strInstructions;
  const video = meal?.strYoutube;

  const ingredients = getIngredientsAndMesures(recipe, 'strIngredient') as string[];

  const measure = getIngredientsAndMesures(
    type === 'meals'
      ? recipe as Meal
      : recipe as Drink,
    'strMeasure',
  ) as string[];

  const handleCopyToClipboard = () => {
    setCopyLink(true);
    const recipeDetailsLink = `http://localhost:3000${pathname}`;
    navigator.clipboard.writeText(recipeDetailsLink);
    setTimeout(() => {
      setCopyLink(false);
    }, 1000);
  };

  const handleFavoriteRecipe = () => {
    let recipeToFavorite:FavoriteType = {} as FavoriteType;

    if (type === 'meals' && id && meal) {
      recipeToFavorite = {
        id,
        type: 'meal',
        nationality: meal.strArea,
        category: meal.strCategory,
        alcoholicOrNot: '',
        name: meal.strMeal,
        image: meal.strMealThumb,
      };
    }

    const isRecipeAlreadyFavorited = favoriteRecipes
      .some((recipes) => recipes.id === recipeToFavorite.id);
    if (isRecipeAlreadyFavorited) {
      handleRemoveFavoriteRecipe(recipeToFavorite.id);
    }
    if (!isRecipeAlreadyFavorited) {
      handleFavoriteRecipes(recipeToFavorite);
    }
  };

  const checkAndUpdateRecipeStatus = useCallback(() => {
    const inProgressRecipesJSON = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipesJSON) {
      const inProgressRecipes = JSON.parse(inProgressRecipesJSON);

      const recipeId = id;

      if (inProgressRecipes[type]
        && inProgressRecipes[type][recipeId as string]) {
        setRecipeStatus(true);
      }
    }
  }, [id, type]);

  useEffect(() => {
    const isRecipeAlreadyFavorited = favoriteRecipes
      .some((recipes) => recipes.id === meal?.idMeal);
    setIsFavorite(isRecipeAlreadyFavorited);
    checkAndUpdateRecipeStatus();
  }, [checkAndUpdateRecipeStatus, favoriteRecipes, id, meal?.idMeal, type]);

  const handleStartRecipe = () => {
    const inProgressRecipesJSON = localStorage.getItem('inProgressRecipes');
    const inProgressRecipes = inProgressRecipesJSON
      ? JSON.parse(inProgressRecipesJSON) : {};

    const recipeId = id;

    inProgressRecipes[type] = {
      ...inProgressRecipes[type],
      [recipeId as string]: ingredients,
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    navigate(`/${type}/${id}/in-progress`);
  };

  return (
    <section className={ styles.recipe_container }>
      <section className={ styles.recipe_header_container }>
        <img
          src={ image }
          alt={ title }
          data-testid="recipe-photo"
          className={ styles.recipe_img }
        />
        <section className={ styles.action_container }>
          <section>
            <BiFoodMenu size={ 32 } color="#FCC436" />
            <p
              data-testid="recipe-category"
            >
              {category}
            </p>
          </section>
          <section className={ styles.actions_button_container }>
            <ActionButtons
              icon={ shareIcon }
              alt="share-btn"
              testId="share-btn"
              onClick={ handleCopyToClipboard }
            />
            <ActionButtons
              icon={ isFavorite ? favoritedIcon : favoriteIcon }
              alt="favorite-btn"
              testId="favorite-btn"
              onClick={ handleFavoriteRecipe }
            />
          </section>
        </section>
        <h2 data-testid="recipe-title">
          {title}
        </h2>
        {copyLink && <CopyAlert />}
      </section>
      <section className={ styles.section_container }>
        <h2>Ingredients</h2>
        <ul className={ styles.ingredient_list }>
          { ingredients && measure
            && ingredients.map((ingredient, index) => (
              <li
                key={ `${ingredient}-${index}` }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient} - ${measure[index]}`}
              </li>
            ))}
        </ul>
      </section>
      <section className={ styles.instructions_container }>
        <h2>Instructions</h2>
        <p data-testid="instructions" className={ styles.instructions }>
          {instructions}
        </p>
      </section>
      { video && (
        <section className={ styles.instructions_container }>
          <h2 data-testid="video">
            Video
          </h2>
          <YouTube
            videoId={ video.split('=')[1] }
            title="YouTube video"
            opts={ opts }
          />
        </section>
      )}
      <MealRecomentation mealRecomendation={ mealRecomendation } />
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

export default MealDetails;
