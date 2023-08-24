import { useCallback, useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../../context/recipesContext';
import { ApiUrlType } from '../../types';

type FiltersReturn = {
  strCategory: string;
};

function Recipes({ type }:{ type: string }) {
  const { setRecipes } = useContext(RecipesContext);

  const [filtersDrinks, setFiltersDrinks] = useState<FiltersReturn[]>([]);
  const [filtersMeals, setFiltersMeals] = useState<FiltersReturn[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>();

  const fetchFilters = useCallback(async () => {
    if (type === 'meals') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setFiltersMeals(data.meals);
    } else if (type === 'drinks') {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setFiltersDrinks(data.drinks);
    }
  }, [type]);

  const fetchRecipes = useCallback(async () => {
    if (type === 'meals') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setRecipes(data.meals);
    } else if (type === 'drinks') {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setRecipes(data.drinks);
    }
  }, [setRecipes, type]);

  useEffect(() => {
    fetchRecipes();
    fetchFilters();
  }, [fetchFilters, fetchRecipes]);

  const apiUrls: ApiUrlType = {
    meals: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
    drinks: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
  };

  const handleClick = async (category:string) => {
    setCurrentFilter(category);
    const apiurl = apiUrls[type as keyof ApiUrlType];
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
