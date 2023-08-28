import { useCallback, useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../../context/recipesContext';
import { ApiUrlType, FiltersReturn } from '../../types';
import ButtonFilters from '../ButtonFilters';

import allDrinksIcon from '../../images/AllDrinks.svg';
import AllMealsIcon from '../../images/AllMealsCategories.svg';

import styles from './recipes.module.css';

function Recipes({ type }:{ type: string }) {
  const { setRecipes } = useContext(RecipesContext);

  const [filtersDrinks, setFiltersDrinks] = useState<FiltersReturn[]>([]);
  const [filtersMeals, setFiltersMeals] = useState<FiltersReturn[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>();

  const fetchFilters = useCallback(async () => {
    try {
      if (type === 'meals') {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        setFiltersMeals(data.meals);
      } else if (type === 'drinks') {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        setFiltersDrinks(data.drinks);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }, [type]);

  const fetchRecipes = useCallback(async () => {
    try {
      if (type === 'meals') {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setRecipes(data.meals);
      } else if (type === 'drinks') {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setRecipes(data.drinks);
      }
    } catch (error) {
      console.error('An error occurred:', error);
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

  const handleClick = async (category: string) => {
    try {
      setCurrentFilter(category);
      const apiurl = apiUrls[type as keyof ApiUrlType];
      if (category === currentFilter) {
        await fetchRecipes();
      } else {
        const response = await fetch(`${apiurl}${category}`);
        const data = await response.json();
        setRecipes(data[type]);
        console.log(data[type]);
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };

  return (
    <section className={ styles.button_filters_container }>
      <button
        data-testid="All-category-filter"
        onClick={ () => fetchRecipes() }
        type="button"
        className={ styles.button_filter }
      >
        <img src={ type === 'meals' ? AllMealsIcon : allDrinksIcon } alt="All" />
        All

      </button>
      {type === 'meals' ? filtersMeals.slice(0, 5)
        .map((category:FiltersReturn) => {
          return (
            <ButtonFilters
              key={ category.strCategory }
              handleClick={ () => handleClick(category.strCategory) }
              category={ category }
            />
          );
        }) : filtersDrinks.slice(0, 5).map((category:FiltersReturn) => {
        return (
          <ButtonFilters
            key={ category.strCategory }
            handleClick={ () => handleClick(category.strCategory) }
            category={ category }
          />
        );
      })}
    </section>
  );
}

export default Recipes;
