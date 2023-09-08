import { useContext, useState } from 'react';
import CardDoneRecipes from '../../components/CardDoneRecipes';
import { RecipesContext } from '../../context/recipesContext';

type FoodItem = {
  id: string;
  nationality: string;
  name: string;
  category: string;
  doneDate: string;
  type: string;
  alcoholicOrNot: string;
  image: string;
  tags: string[];
};

function DoneRecipes() {
  const { doneRecipes } = useContext(RecipesContext);
  const [filter, setFilter] = useState('all');

  const onClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;
    setFilter(id);
    filterRecipes();
  };

  const filterRecipes = () => {
    if (filter === 'all') return doneRecipes;
    return doneRecipes.filter((recipe: FoodItem) => recipe.type === filter);
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
      {doneRecipes && filterRecipes()
        .map((recipe: FoodItem, index: number) => (<CardDoneRecipes
          key={ recipe.id }
          index={ index }
          id={ recipe.id }
          nationality={ recipe.nationality }
          name={ recipe.name }
          category={ recipe.category }
          doneDate={ recipe.doneDate }
          type={ recipe.type }
          image={ recipe.image }
          tags={ recipe.tags }
          alcoholicOrNot={ recipe.alcoholicOrNot }
        />))}

    </section>
  );
}
export default DoneRecipes;
