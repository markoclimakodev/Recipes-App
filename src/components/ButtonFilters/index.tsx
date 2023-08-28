import { FiltersReturn } from '../../types';
import styles from '../Recipes/recipes.module.css';

type ButtonFiltersProps = {
  category: FiltersReturn
  handleClick: (category: string) => void
};

type IconKey =
  | 'Ordinary Drink'
  | 'Cocktail'
  | 'Shake'
  | 'Other / Unknown'
  | 'Cocoa'
  | 'Beef'
  | 'Breakfast'
  | 'Chicken'
  | 'Dessert'
  | 'Goat';

  type IconPaths = {
    [key in IconKey]: string;
  };

function ButtonFilters({ category, handleClick }:ButtonFiltersProps) {
  const icons:IconPaths = {
    'Ordinary Drink': '/src/images/OrdinaryDrink.svg',
    Cocktail: '/src/images/cocktail.svg',
    Shake: '/src/images/shake.svg',
    'Other / Unknown': '/src/images/other.svg',
    Cocoa: '/src/images/cocoa.svg',
    Beef: '/src/images/beefCategory.svg',
    Breakfast: '/src/images/breakfastCategory.svg',
    Chicken: '/src/images/chickenCategory.svg',
    Dessert: '/src/images/dessertCategory.svg',
    Goat: '/src/images/goatCategory.svg',
  };

  const icon = icons[category.strCategory as keyof IconPaths];
  return (
    <button
      onClick={ () => handleClick(category.strCategory) }
      type="button"
      key={ Date.now() }
      data-testid={ `${category.strCategory}-category-filter` }
      className={ styles.button_filter }
    >
      <img src={ icon } alt={ category.strCategory } />
      <span>
        {category.strCategory}
      </span>
    </button>
  );
}
export default ButtonFilters;
