import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipesContext } from '../../context/recipesContext';
import { Drink } from '../../types';
import Recipes from '../../components/Recipes';

function Drinks() {
  const { recipes } = useContext(recipesContext);
  const navigate = useNavigate();

  const drinks = recipes as Drink[];
  const renderDrinks = drinks.length < 12 ? drinks : drinks.slice(0, 12);

  return (
    <>
      <h1>Drinks</h1>
      <Recipes type="drinks" />
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
