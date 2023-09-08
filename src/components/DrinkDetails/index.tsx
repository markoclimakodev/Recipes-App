import { useCallback, useContext, useEffect, useState } from 'react';
import { BiFoodMenu } from 'react-icons/bi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { RecipesContext } from '../../context/recipesContext';
import { getIngredientsAndMesures } from '../../helpers/getIngredientsAndMesures';
import { useRecipeDetails } from '../../hooks/useRecipeDetails';
import { useRecomendation } from '../../hooks/useRecomendation';
import { Drink, FavoriteType } from '../../types';
import ActionButtons from '../ActionButtons';
import CopyAlert from '../CopyAlert';

import favoritedIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/whiteHeartIcon.svg';

import styles from '../../pages/RecipeDetails/recipe.module.css';
import DrinkRecomendation from '../DrinkRecomendation';

type MealDetailsType = {
  type: string
};

function DrinkDetails({ type }:MealDetailsType) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const recipe = useRecipeDetails(type, id || '');
  const navigate = useNavigate();

  const [drink, setDrink] = useState<Drink>();

  const { drinkRecomendation } = useRecomendation(type);

  const [copyLink, setCopyLink] = useState(false);
  const { favoriteRecipes, handleFavoriteRecipes, handleRemoveFavoriteRecipe,
  } = useContext(RecipesContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipeStatus, setRecipeStatus] = useState(false);

  useEffect(() => {
    if (type === 'drinks') {
      setDrink(recipe as Drink);
    }
  }, [type, recipe]);

  const title = drink?.strDrink;
  const image = drink?.strDrinkThumb;
  const category = drink?.strAlcoholic;
  const instructions = drink?.strInstructions;

  const ingredients = getIngredientsAndMesures(
    recipe as Drink,
    'strIngredient',
  ) as string[];

  const measure = getIngredientsAndMesures(
    recipe as Drink,
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

    if (type === 'drinks' && id && drink) {
      recipeToFavorite = {
        id,
        type: 'drink',
        nationality: '',
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
      };
    }

    const isRecipeAlreadyFavorited = favoriteRecipes
      .some((recipes) => recipes.id === recipeToFavorite.id);
    setIsFavorite(isRecipeAlreadyFavorited);
    if (isRecipeAlreadyFavorited) {
      handleRemoveFavoriteRecipe(recipeToFavorite.id);
    }
    if (!isRecipeAlreadyFavorited) {
      handleFavoriteRecipes(recipeToFavorite);
    }
  };

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
      .some((recipes) => recipes.id === drink?.idDrink);
    setIsFavorite(isRecipeAlreadyFavorited);
    checkAndUpdateRecipeStatus();
  }, [checkAndUpdateRecipeStatus, drink?.idDrink, favoriteRecipes]);

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
              alt="fovorite-btn"
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
        <ul className={ ` ${styles.checkbox_list} ${styles.ingredient_list}` }>
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
      <DrinkRecomendation drinkRecomentation={ drinkRecomendation } />
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

export default DrinkDetails;
