import { useCallback, useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../../context/recipesContext';
import { ApiUrlType, FiltersReturn } from '../../types';
import ButtonFilters from '../ButtonFilters';

import allDrinksIcon from '../../images/AllDrinks.svg';
import AllMealsIcon from '../../images/AllMealsCategories.svg';

import styles from './recipes.module.css';

function Recipes({ type }:{ type: string }) {
  const { setRecipes } = useContext(RecipesContext);

  const [filtersButtons, setFiltersButtons] = useState<FiltersReturn[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>();

  const fetchFiltersButtons = useCallback(async () => {
    const urlFilters = {
      meals: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
      drinks: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    };
    try {
      const response = await fetch(urlFilters[type as keyof ApiUrlType]);
      const data = await response.json();
      setFiltersButtons(data[type]);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }, [type]);

  const fetchAllRecipes = useCallback(async () => {
    const urlAllRecipes = {
      meals: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      drinks: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    };
    try {
      const response = await fetch(urlAllRecipes[type as keyof ApiUrlType]);
      const data = await response.json();
      setRecipes(data[type]);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }, [type, setRecipes]);

  const handleClick = async (category: string) => {
    const urlsToFilterRecipes: ApiUrlType = {
      meals: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
      drinks: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
    };
    try {
      const apiurl = urlsToFilterRecipes[type as keyof ApiUrlType];
      if (category === currentFilter || category === 'All') {
        setCurrentFilter('All');
        await fetchAllRecipes();
      } else {
        const response = await fetch(`${apiurl}${category}`);
        const data = await response.json();
        setRecipes(data[type]);
        setCurrentFilter(category);
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
    fetchFiltersButtons();
  }, [fetchFiltersButtons, fetchAllRecipes]);

  return (
    <section className={ styles.button_filters_container }>
      <button
        data-testid="All-category-filter"
        onClick={ () => handleClick('All') }
        type="button"
        className={ styles.button_filter }
      >
        <img src={ type === 'meals' ? AllMealsIcon : allDrinksIcon } alt="All" />
        All

      </button>
      {filtersButtons.slice(0, 5)
        .map((category:FiltersReturn) => {
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
