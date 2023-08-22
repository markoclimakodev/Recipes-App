import { useContext, useEffect, useState } from 'react';
import { recipesContext } from '../../context/recipesContext';

function Recipes({ type }:{ type: string }) {
  const { setRecipes } = useContext(recipesContext);

  const [filtersDrinks, setFiltersDrinks] = useState<FiltersReturn[]>([]);
  const [filtersMeals, setFiltersMeals] = useState<FiltersReturn[]>([]);

  type FiltersReturn = {
    strCategory: string;
  };
  const FetchFilters = async () => {
    if (type === 'meals') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setFiltersMeals(data.meals);
      console.log(data.meals);
    } else if (type === 'drinks') {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setFiltersDrinks(data.drinks);
    }
  };

  const fetchRecipes = async () => {
    if (type === 'meals') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setRecipes(data.meals);
    } else if (type === 'drinks') {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setRecipes(data.drinks);
    }
  };

  useEffect(() => {
    fetchRecipes();
    FetchFilters();
  }, []);

  return (
    <>
      {/* <h1>{type === 'meals' ? 'Meals' : 'Drinks'}</h1> */}
      {type === 'meals' ? filtersMeals.slice(0, 5)
        .map((category:FiltersReturn, index) => {
          return (
            <button
              type="button"
              key={ index }
              data-testid={ `${category.strCategory}-category-filter` }
            >
              {category.strCategory}
            </button>
          );
        }) : filtersDrinks.slice(0, 5).map((category:FiltersReturn, index) => {
        return (
          <button
            type="button"
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            {category.strCategory}
          </button>
        );
      })}
    </>
  );
}

export default Recipes;
