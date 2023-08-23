export const fetchDrinkRecommendations = async () => {
  try {
    const drinkRecommendationsResponse = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    );

    if (!drinkRecommendationsResponse.ok) {
      throw new Error('Error');
    }

    const drinkRecommendationsData = await drinkRecommendationsResponse.json();
    return drinkRecommendationsData.drinks;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMealsRecommendations = async () => {
  try {
    const mealsRecommendationsResponse = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    );

    if (!mealsRecommendationsResponse.ok) {
      throw new Error('Error');
    }

    const mealsRecommendationsData = await mealsRecommendationsResponse.json();
    return mealsRecommendationsData.meals;
  } catch (error) {
    console.error(error);
  }
};
