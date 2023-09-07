import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from '../../pages/RecipeDetails/recipe.module.css';

type MealRecipeProps = {
  ingredients: string[];
  measure: string[];
};
type StringArray = string[];
type CheckType = {
  meals: {
    [key: string]: StringArray;
  };
  drinks: {
    [key: string]: StringArray;
  };
};

function MealIngredientsDetails({
  ingredients,
  measure,
}: MealRecipeProps) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const currentPage = pathname.split('/')[3];
  const keyType = pathname.split('/')[1];
  const [ingredientCheck, setIngredientsCheck] = useState<string[]>([]);
  const [ingredientStored, setIngredientStored] = useState<CheckType>({} as CheckType);
  const getIngredientFromLocalStorage = () => {
    const getIngredients = localStorage.getItem('ingredientsChecked');
    if (getIngredients) {
      setIngredientStored(JSON.parse(getIngredients));
    }
  };
  const handleSaveIngredient = useCallback(() => {
    const ingredientToSave = {
      ...ingredientStored,
      [keyType]: {
        ...(ingredientStored[keyType as keyof CheckType] || {}),
        [id as string]: ingredientCheck,
      },
    };
    localStorage.setItem('ingredientsChecked', JSON.stringify(ingredientToSave));
  }, [id, ingredientCheck, ingredientStored, keyType]);
  useEffect(() => {
    getIngredientFromLocalStorage();
  }, []);
  useEffect(() => {
    handleSaveIngredient();
  }, [ingredientCheck, handleSaveIngredient]);
  const handleIngredientsCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (checked && !ingredientCheck.includes(name)) {
      setIngredientsCheck((prevCheck) => [...prevCheck, name]);
    } else if (!checked) {
      setIngredientsCheck((prevCheck) => prevCheck
        .filter((ingredient) => ingredient !== name));
    }
  };

  useEffect(() => {
    if (
      ingredientStored[keyType as keyof CheckType]
      && ingredientStored[keyType as keyof CheckType][id as string]
    ) {
      setIngredientsCheck(ingredientStored[keyType as keyof CheckType][id as string]);
    } else {
      setIngredientsCheck([]);
    }
  }, [ingredientStored, id, keyType]);
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
                  className={ ingredientCheck.includes(ingredient) ? styles.check : '' }
                >
                  <input
                    type="checkbox"
                    id="MealCheck"
                    name={ ingredient }
                    onChange={ handleIngredientsCheck }
                    checked={ ingredientCheck.includes(ingredient) }
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
