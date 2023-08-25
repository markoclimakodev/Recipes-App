import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipesFilters from '../../components/RecipesFilters';
import { RecipesContext } from '../../context/recipesContext';
import { Drink } from '../../types';

function Drinks() {
  const { recipes } = useContext(RecipesContext);
  const navigate = useNavigate();

  const drinks = recipes as Drink[];
  const renderDrinks = drinks.length < 12 ? drinks : drinks.slice(0, 12);

  return (
    <>
      <h1>Drinks</h1>
      <RecipesFilters type="drinks" />
      <ul>
        {renderDrinks.map((recipe: Drink, index) => {
          const { idDrink, strDrinkThumb, strDrink } = recipe;
          return (
            <li key={ idDrink } data-testid={ `${index}-recipe-card` }>
              <button type="button" onClick={ () => navigate(`/drinks/${idDrink}`) }>
                <img
                  src={ strDrinkThumb }
                  alt={ strDrink }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Drinks;
