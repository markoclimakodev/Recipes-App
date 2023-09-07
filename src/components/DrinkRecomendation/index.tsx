import styles from '../../pages/RecipeDetails/recipe.module.css';
import { Meal } from '../../types';

type DrinkRecomendationProps = {
  drinkRecomentation: Meal[]
};
function DrinkRecomendation({
  drinkRecomentation }:DrinkRecomendationProps) {
  return (
    <section className={ styles.instructions_container }>
      <h2>Recommended</h2>
      <section className={ styles.carousel }>
        {drinkRecomentation.slice(0, 6).map((meals, index) => (
          <section
            key={ meals.idMeal }
            data-testid={ `${index}-recommendation-card` }
            className={ styles.card }
          >
            <img src={ meals.strMealThumb } alt={ meals.strMeal } />
            <h3
              data-testid={ `${index}-recommendation-title` }
            >
              {meals.strMeal}
            </h3>
          </section>
        ))}
      </section>
    </section>
  );
}

export default DrinkRecomendation;
