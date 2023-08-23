import { useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

function RecipeDetails() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const currentPage = pathname.split('/')[1];

  const fetchRecipeDetail = useCallback(async () => {
    try {
      const apiTarget = currentPage === 'meals' ? 'themealdb' : 'thecocktaildb';
      const apiUrl = `https://www.${apiTarget}.com/api/json/v1/1/lookup.php?i=${id}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Error');
      }

      const recipeData = await response.json();
      console.log(recipeData);
    } catch (error) {
      console.error(error);
    }
  }, [currentPage, id]);

  useEffect(() => {
    fetchRecipeDetail();
  }, [fetchRecipeDetail]);

  return (
    <div />
  );
}

export default RecipeDetails;
