import { FiltersReturn } from '../../types';
import styles from '../Recipes/recipes.module.css';

import OrdinaryDrinkImage from '../../images/OrdinaryDrink.svg';
import BeefImage from '../../images/beefCategory.svg';
import BreakfastImage from '../../images/breakfastCategory.svg';
import ChickenImage from '../../images/chickenCategory.svg';
import CocktailImage from '../../images/cocktail.svg';
import CocoaImage from '../../images/cocoa.svg';
import DessertImage from '../../images/dessertCategory.svg';
import GoatImage from '../../images/goatCategory.svg';
import OtherUnknownImage from '../../images/other.svg';
import ShakeImage from '../../images/shake.svg';

type ButtonFiltersProps = {
  category: FiltersReturn
  handleClick: (category: string) => void
  selected: boolean

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

function ButtonFilters({ category, handleClick, selected }:ButtonFiltersProps) {
  const icons:IconPaths = {
    'Ordinary Drink': OrdinaryDrinkImage,
    Cocktail: CocktailImage,
    Shake: ShakeImage,
    'Other / Unknown': OtherUnknownImage,
    Cocoa: CocoaImage,
    Beef: BeefImage,
    Breakfast: BreakfastImage,
    Chicken: ChickenImage,
    Dessert: DessertImage,
    Goat: GoatImage,
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
      <span
        className={
          `${styles.button_filter} ${selected
            ? styles.selected_filter : ''}`
            }
      >
        {category.strCategory}
      </span>
    </button>
  );
}
export default ButtonFilters;
