import styles from '../../pages/RecipeDetails/recipe.module.css';
import { Drink } from '../../types';

type MealRecomentationProps = {
  mealRecomendation: Drink[]
};
export default function MealRecomentation({ mealRecomendation }:MealRecomentationProps) {
  return (
    <section className={ styles.instructions_container }>
      <h2>Recommended</h2>
      <section className={ styles.carousel }>
        {mealRecomendation.slice(0, 6).map((drinks, index) => (
          <section
            key={ drinks.idDrink }
            data-testid={ `${index}-recommendation-card` }
            className={ styles.card }
          >
            <img src={ drinks.strDrinkThumb } alt={ drinks.strDrink } />
            <h3
              data-testid={ `${index}-recommendation-title` }
            >
              {drinks.strDrink}
            </h3>
          </section>
        ))}
      </section>
    </section>
  );
}
