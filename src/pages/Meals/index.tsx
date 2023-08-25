import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipesFilters from '../../components/RecipesFilters';
import { RecipesContext } from '../../context/recipesContext';
import { Meal } from '../../types';

function Meals() {
  const { recipes } = useContext(RecipesContext);
  const navigate = useNavigate();

  const meals = recipes as Meal[];
  const renderMeals = meals.length < 12 ? meals : meals.slice(0, 12);

  return (
    <>
      <h1>Meals</h1>
      <RecipesFilters type="meals" />
      <ul>
        {renderMeals.map((recipe: Meal, index) => {
          const { idMeal, strMealThumb, strMeal } = recipe;
          return (
            <li key={ idMeal } data-testid={ `${index}-recipe-card` }>
              <button type="button" onClick={ () => navigate(`/meals/${idMeal}`) }>
                <img
                  src={ strMealThumb }
                  alt={ strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Meals;
