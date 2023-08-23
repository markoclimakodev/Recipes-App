import { useContext, useEffect, useState } from 'react';
import { recipesContext } from '../../context/recipesContext';

type FiltersReturn = {
  strCategory: string;
};

type ApiUrl = {
  meals: string;
  drinks: string;
};

function Recipes({ type }:{ type: string }) {
  const { setRecipes } = useContext(recipesContext);

  const [filtersDrinks, setFiltersDrinks] = useState<FiltersReturn[]>([]);
  const [filtersMeals, setFiltersMeals] = useState<FiltersReturn[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>();

  const FetchFilters = async () => {
    if (type === 'meals') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setFiltersMeals(data.meals);
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

  const apiUrls: ApiUrl = {
    meals: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
    drinks: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
  };

  const handleClick = async (category:string) => {
    setCurrentFilter(category);
    const apiurl = apiUrls[type as keyof ApiUrl];
    if (category === currentFilter) return fetchRecipes();
    const response = await fetch(`${apiurl}${category}`);
    const data = await response.json();
    setRecipes(data[type]);
  };

  return (
    <>
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
              key={ Date.now() + index }
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
            key={ Date.now() + index }
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
