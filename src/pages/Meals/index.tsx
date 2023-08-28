import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Recipes from '../../components/Recipes';
import { RecipesContext } from '../../context/recipesContext';
import { Meal } from '../../types';

import styles from './meals.module.css';

function Meals() {
  const { recipes } = useContext(RecipesContext);
  const navigate = useNavigate();

  const meals = recipes as Meal[];
  const renderMeals = meals.length < 12 ? meals : meals.slice(0, 12);

  return (
    <>
      <Recipes type="meals" />
      <ul className={ styles.recipe_card_container }>
        {renderMeals.map((recipe: Meal, index) => {
          const { idMeal, strMealThumb, strMeal } = recipe;
          return (
            <li
              key={ idMeal }
              data-testid={ `${index}-recipe-card` }
              className={ styles.recipe_card }
            >
              <button
                type="button"
                onClick={ () => navigate(`/meals/${idMeal}`) }
                className={ styles.card_button }
              >
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
