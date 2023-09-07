import { useContext } from 'react';
import { BiDrink } from 'react-icons/bi';
import { RecipesContext } from '../../context/recipesContext';
import favoritedIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/whiteHeartIcon.svg';
import styles from '../../pages/RecipeDetails/recipe.module.css';
import { Drink, Meal } from '../../types';
import ActionButtons from '../ActionButtons';
import DrinkIngredientsDetails from '../DrinkIngredientsDetails';

type DrinkRecipeProps = {
  drinkRecipe: Drink
  ingredients: string[]
  measure: string[]
  mealsRecomendation: Meal[]
  handleCopyToClipBoard: () => void
  handleFavorite: () => void
};

function DrinkRecipeDetails({
  drinkRecipe,
  ingredients,
  measure,
  mealsRecomendation,
  handleCopyToClipBoard,
  handleFavorite,
}:DrinkRecipeProps) {
  const { favoriteRecipes } = useContext(RecipesContext);
  const isFavorite = favoriteRecipes.find((recipe) => recipe.id === drinkRecipe.idDrink);

  return (
    <>
      <section className={ styles.recipe_header_container }>
        <img
          src={ drinkRecipe.strDrinkThumb }
          alt={ drinkRecipe.strDrink }
          data-testid="recipe-photo"
          className={ styles.recipe_img }
        />
        <section className={ styles.action_container }>
          <BiDrink size={ 32 } color="#FCC436" />
          <p
            data-testid="recipe-category"
            className={ styles.category }
          >
            {drinkRecipe.strAlcoholic}

          </p>
          <section className={ styles.actions_button_container }>
            <ActionButtons
              icon={ shareIcon }
              alt="share-btn"
              testId="share-btn"
              onClick={ handleCopyToClipBoard }
            />
            <ActionButtons
              icon={ isFavorite ? favoritedIcon : favoriteIcon }
              alt="fovorite-btn"
              testId="favorite-btn"
              onClick={ handleFavorite }
            />

          </section>
        </section>
        <h2 data-testid="recipe-title">
          {drinkRecipe.strDrink}
        </h2>
      </section>

      <DrinkIngredientsDetails
        ingredients={ ingredients }
        measure={ measure }
        drinkRecipe={ drinkRecipe }
      />
      <section className={ styles.instructions_container }>
        <h2>Instructions</h2>
        <p data-testid="instructions" className={ styles.instructions }>
          {drinkRecipe.strInstructions}
        </p>
      </section>
      <section>
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
      </section>
    </>
  );
}

export default DrinkRecipeDetails;
