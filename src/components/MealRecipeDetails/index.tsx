import { BiFoodMenu } from 'react-icons/bi';
import favoriteIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import styles from '../../pages/Recipe/recipe.module.css';
import { Drink, Meal } from '../../types';
import ActionButtons from '../ActionButtons';

type MealRecipeProps = {
  mealRecipe: Meal
  ingredients: string[];
  measure: string[];
  drinksRecomendation: Drink[];
  handleCopyToClipBoard: () => void
  handleFavorite: () => void
};

function MealRecipeDetails({
  mealRecipe,
  ingredients,
  measure,
  drinksRecomendation,
  handleCopyToClipBoard,
  handleFavorite,
}:MealRecipeProps) {
  return (
    <>
      <section className={ styles.recipe_header_container }>
        <img
          src={ mealRecipe.strMealThumb }
          alt={ mealRecipe.strMeal }
          data-testid="recipe-photo"
          className={ styles.recipe_img }
        />
        <section className={ styles.action_container }>
          <section>
            <BiFoodMenu size={ 32 } color="#FCC436" />
            <p
              data-testid="recipe-category"
            >
              {mealRecipe.strCategory}
            </p>
          </section>
          <section className={ styles.actions_button_container }>
            <ActionButtons
              icon={ shareIcon }
              alt="share-btn"
              testId="share-btn"
              onClick={ handleCopyToClipBoard }
            />
            <ActionButtons
              icon={ favoriteIcon }
              alt="fovorite-btn"
              testId="favorite-btn"
              onClick={ handleFavorite }
            />

          </section>

        </section>
        <h2 data-testid="recipe-title">
          {mealRecipe.strMeal}
        </h2>
      </section>
      <section>
        <h2>Ingredients</h2>
        <ul className={ styles.ingredient_list }>
          {
            ingredients && measure && ingredients.map((ingredient, index) => (
              <li
                key={ Date.now() + index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient}
                {' '}
                -
                {' '}
                {measure[index]}
              </li>
            ))
          }
        </ul>
      </section>

      <section className={ styles.instructions_container }>
        <h2>Instructions</h2>
        <p data-testid="instructions" className={ styles.instructions }>
          {mealRecipe.strInstructions}
        </p>
      </section>

      <section>
        <h2>Video</h2>
        { mealRecipe.strYoutube && (
          <iframe
            width="560"
            height="315"
            src={ mealRecipe.strYoutube }
            title="YouTube video player"
            data-testid="video"
            className={ styles.video }
          />
        )}

      </section>

      <section>
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
      </section>

    </>
  );
}

export default MealRecipeDetails;
