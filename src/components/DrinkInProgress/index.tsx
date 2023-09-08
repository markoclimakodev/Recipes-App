import { useContext, useEffect, useState } from 'react';
import { BiFoodMenu } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { RecipesContext } from '../../context/recipesContext';
import { getIngredientsAndMesures } from '../../helpers/getIngredientsAndMesures';
import { useRecipeDetails } from '../../hooks/useRecipeDetails';
import { useRecomendation } from '../../hooks/useRecomendation';
import { DoneRecipesType, Drink, FavoriteType } from '../../types';
import ActionButtons from '../ActionButtons';
import CopyAlert from '../CopyAlert';

import favoritedIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/whiteHeartIcon.svg';

import styles from '../../pages/RecipeInProgress/inprogress.module.css';
import DrinkRecomendation from '../DrinkRecomendation';

type MealDetailsType = {
  type: string
};

type Checks = { [recipeId: string]:
{ [index: number]: boolean }
};

function DrinkInProgress({ type }:MealDetailsType) {
  const { id } = useParams();
  const recipe = useRecipeDetails(type, id || '');
  const navigate = useNavigate();

  const [drink, setDrink] = useState<Drink>();

  const { drinkRecomendation } = useRecomendation(type);

  const [copyLink, setCopyLink] = useState(false);
  const { favoriteRecipes,
    doneRecipes,
    handleFavoriteRecipes,
    handleRemoveFavoriteRecipe,
    handleDoneRecipes,
  } = useContext(RecipesContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checks, setChecks] = useState<Checks>({} as Checks);

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
    const recipeDetailsLink = `http://localhost:3000/${type}/${id}`;
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

  useEffect(() => {
    const isRecipeAlreadyFavorited = favoriteRecipes
      .some((recipes) => recipes.id === drink?.idDrink);
    setIsFavorite(isRecipeAlreadyFavorited);
  }, [drink?.idDrink, favoriteRecipes]);

  const handleDoneRecipe = () => {
    let recipeDone:DoneRecipesType = {} as DoneRecipesType;

    if (type === 'drinks' && drink) {
      recipeDone = {
        id: id || '',
        type: 'drink',
        nationality: '',
        doneDate: new Date().toISOString(),
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
        tags: drink.strTags ? drink.strTags.split(',') : [],
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
                <label
                  htmlFor={ ingredient }
                  data-testid={ `${index}-ingredient-step` }
                  className={ checks[id as string]?.[index]
                    ? styles.check : styles.uncheck }
                >
                  <input
                    type="checkbox"
                    id={ ingredient }
                    name={ ingredient }
                    className={ styles.checkbox }
                    onChange={ () => handleCheckBox(id as string, index) }
                    checked={ checks[id as string]?.[index] || false }
                  />
                  {ingredient}
                  {' '}
                  -
                  {' '}
                  {measure[index]}
                </label>
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
export default DrinkInProgress;
