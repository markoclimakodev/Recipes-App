import { useContext, useState } from 'react';
import CardFavoriteRecipes from '../../components/CardFavoriteRecipes';
import { RecipesContext } from '../../context/recipesContext';

import drinkIcon from '../../images/AllDrinks.svg';
import foodIcon from '../../images/AllMealsCategories.svg';
import allRecipesIcon from '../../images/AllRecipesIcon.svg';

import styles from './favorite-recipes.module.css';

type FoodItem = {
  id: string;
  nationality: string;
  name: string;
  category: string;
  type: string;
  alcoholicOrNot: string;
  image: string;
};

function FavoritesRecipes() {
  const [filter, setFilter] = useState('all');
  const { favoriteRecipes } = useContext(RecipesContext);

  const onClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;
    setFilter(id);
    filterRecipes();
  };

  const filterRecipes = () => {
    if (filter === 'all') return favoriteRecipes;
    return favoriteRecipes.filter((recipe: FoodItem) => recipe.type === filter);
  };

  return (
    <section className={ styles.favorite_recipes_container }>
      <section className={ styles.filters_container }>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          id="all"
          onClick={ onClickFilter }
          className={ `${styles.filter_btn} ${
            filter === 'all' ? styles.selected_filter : ''
          }` }
        >
          <img src={ allRecipesIcon } alt="" srcSet="" />
          All

        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          id="meal"
          onClick={ onClickFilter }
          className={ `${styles.filter_btn} ${
            filter === 'meal' ? styles.selected_filter : ''
          }` }
        >
          <img src={ foodIcon } alt="" srcSet="" />
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          id="drink"
          onClick={ onClickFilter }
          className={ `${styles.filter_btn} ${
            filter === 'drink' ? styles.selected_filter : ''
          }` }
        >
          <img src={ drinkIcon } alt="" />
          Drinks
        </button>
      </section>
      {favoriteRecipes && filterRecipes()
        .map((recipe: FoodItem, index: number) => (<CardFavoriteRecipes
          key={ recipe.id }
          index={ index }
          id={ recipe.id }
          nationality={ recipe.nationality }
          name={ recipe.name }
          category={ recipe.category }
          type={ recipe.type }
          image={ recipe.image }
          alcoholicOrNot={ recipe.alcoholicOrNot }
        />))}

    </section>
  );
}

export default FavoritesRecipes;
