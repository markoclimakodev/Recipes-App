import { useLocation } from 'react-router-dom';

import DrinkDetails from '../../components/DrinkDetails';
import MealDetails from '../../components/MealDetails';
import styles from './recipe.module.css';

function RecipeDetails() {
  const { pathname } = useLocation();
  const type = pathname.split('/')[1];

  return (
    <section className={ styles.recipe_container }>
      { type === 'drinks' && <DrinkDetails type={ type } />}
      { type === 'meals' && <MealDetails type={ type } />}
    </section>
  );
}
export default RecipeDetails;
