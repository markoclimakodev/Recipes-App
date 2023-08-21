import { useContext } from 'react';
import { recipesContext } from '../../context/recipesContext';
import { Drink } from '../../types';

function Drinks() {
  const { recipes } = useContext(recipesContext);
  const drinks = recipes as Drink[];
  const renderDrinks = drinks.length < 12 ? drinks : drinks.slice(0, 12);

  return (
    <>
      <h1>Drinks</h1>
      <ul>
        {renderDrinks.map((recipe: Drink, index) => {
          const { idDrink, strDrinkThumb, strDrink } = recipe;
          return (
            <li key={ idDrink } data-testid={ `${index}-recipe-card` }>
              <img
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Drinks;
