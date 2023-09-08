import { useParams } from 'react-router-dom';
import styles from '../../pages/RecipeInProgress/inprogress.module.css';

type Checks = { [recipeId: string]:
{ [index: number]: boolean }
};

type MealCheckListProps = {
  ingredients: string[],
  measures:string[],
  checks: Checks
  handleCheckBox: (drinkId: string, index: number) => void
};

function MealCheckList({
  ingredients,
  measures,
  checks,
  handleCheckBox,
}:MealCheckListProps) {
  const { id } = useParams();

  return (
    <section className={ styles.section_container }>
      <h2>Ingredients</h2>
      <ul className={ ` ${styles.checkbox_list} ${styles.ingredient_list}` }>
        { id && ingredients && measures
            && ingredients.map((ingredient, index) => (
              <li
                key={ ingredient + measures[index] }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                <label
                  htmlFor={ ingredient + index }
                  data-testid={ `${index}-ingredient-step` }
                  className={ checks[id as string]?.[index]
                    ? styles.check : styles.uncheck }
                >
                  <input
                    type="checkbox"
                    id={ ingredient + index }
                    name={ ingredient }
                    className={ styles.checkbox }
                    onChange={ () => handleCheckBox(id as string, index) }
                    checked={ checks[id as string]?.[index] || false }
                  />
                  {ingredient}
                  -
                  {measures[index]}
                </label>
              </li>
            ))}
      </ul>
    </section>
  );
}

export default MealCheckList;
