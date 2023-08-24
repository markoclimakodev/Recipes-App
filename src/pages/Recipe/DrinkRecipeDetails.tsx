import { BiDrink } from 'react-icons/bi';
import { Drink, Meal } from '../../types';
import styles from './recipe.module.css';

type DrinkRecipeProps = {
  drinkRecipe: Drink
  ingredients: string[];
  measure: string[];
  mealsRecomendation: Meal[];
};

function DrinkRecipeDetails({
  drinkRecipe, ingredients, measure, mealsRecomendation }:DrinkRecipeProps) {
  return (
    <section className={ styles.recipe_container }>
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
        </section>
        <h2 data-testid="recipe-title">
          {drinkRecipe.strDrink}
        </h2>
      </section>

      <section>
        <h2>Ingredients</h2>

        <ul className={ styles.ingredient_list }>
          {
            (ingredients && measure) && ingredients.map((ingredient, index) => (
              <li
                key={ Date.now() + index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient}
                -
                {measure[index]}
              </li>
            ))
          }
        </ul>
      </section>
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
      <button
        data-testid="start-recipe-btn"
        className={ styles.start_recipe_button }
      >
        start recipe
      </button>
    </section>
  );
}

export default DrinkRecipeDetails;
