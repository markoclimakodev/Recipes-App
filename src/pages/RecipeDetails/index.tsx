import { useLocation } from 'react-router-dom';

import DrinkDetails from '../../components/DrinkDetails';
import MealDetails from '../../components/MealDetails';

function RecipeDetails() {
  const { pathname } = useLocation();
  const type = pathname.split('/')[1];

  return (
    <>
      { type === 'drinks' && <DrinkDetails type={ type } />}
      { type === 'meals' && <MealDetails type={ type } />}
    </>
  );
}
export default RecipeDetails;
