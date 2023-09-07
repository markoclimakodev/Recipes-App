import { useContext, useState } from 'react';
import CardFavoriteRecipes from '../../components/CardFavoriteRecipes';
import { RecipesContext } from '../../context/recipesContext';

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
    <section>
      <section>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          id="all"
          onClick={ onClickFilter }
        >
          All

        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          id="meal"
          onClick={ onClickFilter }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          id="drink"
          onClick={ onClickFilter }
        >
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
