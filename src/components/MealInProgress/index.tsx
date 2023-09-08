import { useContext, useEffect, useState } from 'react';
import { BiFoodMenu } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import YouTube, { YouTubeProps } from 'react-youtube';
import { RecipesContext } from '../../context/recipesContext';
import { getIngredientsAndMesures } from '../../helpers/getIngredientsAndMesures';
import { useRecipeDetails } from '../../hooks/useRecipeDetails';
import { useRecomendation } from '../../hooks/useRecomendation';
import favoritedIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/whiteHeartIcon.svg';
import { DoneRecipesType, FavoriteType, Meal } from '../../types';
import ActionButtons from '../ActionButtons';
import CopyAlert from '../CopyAlert';
import MealRecomentation from '../MealRecomendation';
import MealCheckList from './mealCheckList';
import styles from '../../pages/RecipeInProgress/inprogress.module.css';

type MealDetailsType = {
  type: string
};

export type StringArray = string[];

export type CheckType = {
  meals: {
    [key: string]: StringArray;
  };
  drinks: {
    [key: string]: StringArray;
  };
};

type Checks = { [recipeId: string]:
{ [index: number]: boolean }
};

function MealInProgress({ type }:MealDetailsType) {
  const { id } = useParams();
  const recipe = useRecipeDetails(type, id || '');
  const navigate = useNavigate();
  const [meal, setMeal] = useState<Meal>();
  const { mealRecomendation } = useRecomendation(type);
  const [copyLink, setCopyLink] = useState(false);
  const { favoriteRecipes,
    doneRecipes,
    handleFavoriteRecipes,
    handleRemoveFavoriteRecipe,
    handleDoneRecipes,
  } = useContext(RecipesContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checks, setChecks] = useState<Checks>({} as Checks);
  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '100%',
  };

  useEffect(() => {
    if (type === 'meals') setMeal(recipe as Meal);
  }, [type, recipe]);

  const title = meal?.strMeal;
  const image = meal?.strMealThumb;
  const category = meal?.strCategory;
  const instructions = meal?.strInstructions;
  const video = meal?.strYoutube;
  const ingredients = getIngredientsAndMesures(recipe, 'strIngredient') as string[];
  const measure = getIngredientsAndMesures(recipe, 'strMeasure') as string[];

  const handleCopyToClipboard = () => {
    setCopyLink(true);
    const recipeDetailsLink = `http://localhost:3000/${type}/${id}`;
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

  useEffect(() => {
    const isRecipeAlreadyFavorited = favoriteRecipes
      .some((recipes) => recipes.id === meal?.idMeal);
    setIsFavorite(isRecipeAlreadyFavorited);
  }, [favoriteRecipes, id, meal?.idMeal, type]);

  const handleDoneRecipe = () => {
    let recipeDone:DoneRecipesType = {} as DoneRecipesType;
    if (type === 'meals' && meal) {
      recipeDone = {
        id: id || '',
        nationality: meal.strArea,
        name: meal.strMeal,
        category: meal.strCategory,
        doneDate: new Date().toISOString(),
        type: 'meal',
        alcoholicOrNot: '',
        image: meal.strMealThumb,
        tags: meal?.strTags ? meal?.strTags.split(',') : [],
      };
    }
    const recipeDoneCheck = doneRecipes
      .some((alreadyDecipe) => alreadyDecipe.id === recipeDone.id);
    if (!recipeDoneCheck) {
      handleDoneRecipes(recipeDone);
    }
    navigate('/done-recipes');
  };

  const handleCheckBox = (drinkId: string, index: number) => {
    setChecks((prevCheck) => {
      const updatedChecks = {
        ...prevCheck,
        [drinkId]: {
          ...prevCheck[drinkId],
          [index]: !prevCheck[drinkId]?.[index] || false,
        },
      };
      localStorage.setItem('ingredientChecks', JSON.stringify(updatedChecks));
      return updatedChecks;
    });
  };

  const areAllIngredientsChecked = () => {
    const ingredientCheck = checks[id as string];
    if (!ingredientCheck || ingredients === undefined) {
      return false;
    }
    return ingredients.every((_, index) => ingredientCheck[index]);
  };

  useEffect(() => {
    const storedChecks = JSON.parse(
      localStorage.getItem('ingredientChecks') || '{}',
    );
    setChecks(storedChecks);
  }, []);

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
      <MealCheckList
        ingredients={ ingredients }
        measures={ measure }
        checks={ checks }
        handleCheckBox={ handleCheckBox }
      />
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
      <MealRecomentation
        mealRecomendation={ mealRecomendation }
      />
      <button
        data-testid="finish-recipe-btn"
        className={ styles.start_recipe_button }
        onClick={ handleDoneRecipe }
        disabled={ !areAllIngredientsChecked() }
      >
        Finish Recipe
      </button>
    </section>
  );
}
export default MealInProgress;
