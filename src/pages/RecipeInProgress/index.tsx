import { useLocation } from 'react-router-dom';

import DrinkInProgress from '../../components/DrinkInProgress';
import MealInProgress from '../../components/MealInProgress';
import styles from './inprogress.module.css';

function RecipeInProgress() {
  const { pathname } = useLocation();
  const type = pathname.split('/')[1];

  return (
    <section className={ styles.recipe_container }>
      { type === 'drinks' && <DrinkInProgress type={ type } />}
      { type === 'meals' && <MealInProgress type={ type } />}
    </section>

  );
}
export default RecipeInProgress;
