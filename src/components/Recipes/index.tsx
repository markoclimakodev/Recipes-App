import { useContext, useEffect, useState } from 'react';
import { recipesContext } from '../../context/recipesContext';

function Recipes({ type }:{ type: string }) {
  const { setRecipes } = useContext(recipesContext);

  const [filtersDrinks, setFiltersDrinks] = useState<FiltersReturn[]>([]);
  const [filtersMeals, setFiltersMeals] = useState<FiltersReturn[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>();

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

  const handleClick = async (category:string) => {
    setCurrentFilter(category);
    if (type === 'meals') {
      if (category === currentFilter) return fetchRecipes();
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      setRecipes(data.meals);
    } else if (type === 'drinks') {
      if (category === currentFilter) return fetchRecipes();
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      setRecipes(data.drinks);
    }
  };

  return (
    <>
      {/* <h1>{type === 'meals' ? 'Meals' : 'Drinks'}</h1> */}
      <button
        data-testid="All-category-filter"
        onClick={ () => fetchRecipes() }
        type="button"
      >
        All

      </button>
      {type === 'meals' ? filtersMeals.slice(0, 5)
        .map((category:FiltersReturn, index) => {
          return (
            <button
              onClick={ () => handleClick(category.strCategory) }
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
            onClick={ () => handleClick(category.strCategory) }
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
