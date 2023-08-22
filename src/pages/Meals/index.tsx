import { useContext } from 'react';
import { recipesContext } from '../../context/recipesContext';
import { Meal } from '../../types';
import Recipes from '../../components/Recipes';

function Meals() {
  const { recipes } = useContext(recipesContext);
  const meals = recipes as Meal[];
  const renderMeals = meals.length < 12 ? meals : meals.slice(0, 12);

  return (
    <>
      <h1>Meals</h1>
      <Recipes type="meals" />
      <ul>
        {renderMeals.map((recipe: Meal, index) => {
          const { idMeal, strMealThumb, strMeal } = recipe;
          return (
            <li key={ idMeal } data-testid={ `${index}-recipe-card` }>
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Meals;
