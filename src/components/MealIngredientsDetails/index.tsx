import React, { useCallback, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from '../../pages/RecipeDetails/recipe.module.css';

type MealRecipeProps = {
  ingredients: string[];
  measure: string[];
};

function MealIngredientsDetails({
  ingredients,
  measure,
}: MealRecipeProps) {
  const { id } = useParams();
  console.log(id);
  const { pathname } = useLocation();
  const currentPage = pathname.split('/')[3];
  console.log(currentPage);
  const [check, setCheck] = useState<{ [key: number]: boolean }>({});

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const { checked } = event.target;
    setCheck((prevCheck) => ({ ...prevCheck, [name]: checked }));
  }, []);
  return (
    <div>
      <section className={ styles.section_container }>
        <h2>Ingredients</h2>
        <ul className={ styles.ingredient_list }>
          {
          currentPage === 'in-progress' ? (
            ingredients
            && measure
            && ingredients.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                <label
                  htmlFor="MealCheck"
                  data-testid={ `${index}-ingredient-step` }
                  className={ check[index] ? styles.check : '' }
                >
                  <input
                    type="checkbox"
                    id="MealCheck"
                    name={ index.toString() }
                    onChange={ handleChange }
                    checked={ check[index] || false }
                  />

                  {ingredient}
                  {' '}
                  -
                  {' '}
                  {measure[index]}
                </label>
              </li>
            ))) : (
            ingredients && measure && ingredients.map((ingredient, index) => (
              <li
                key={ Date.now() + index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient}
                {' '}
                -
                {' '}
                {measure[index]}
              </li>
            ))
          )
}
        </ul>
      </section>
    </div>
  );
}

export default MealIngredientsDetails;
