import beefMeals from '../Mocks/beefMeals';
import breakfastMeals from '../Mocks/breakfastMeals';
import chickenMeals from '../Mocks/chickenMeals';
import cocktailDrinks from '../Mocks/cocktaiDrinks';
import cocoaDrinks from '../Mocks/cocoaDrinks';
import corba from '../Mocks/corba';
import dessertMeals from '../Mocks/dessertMeals';
import drinkCategories from '../Mocks/drinkCategories';
import drinksByFirstLetter from '../Mocks/drinksByFirstLetter';
import drinksList from '../Mocks/drinnksList';
import gg from '../Mocks/gg';
import ginDrinks from '../Mocks/ginDrinks';
import goatMeals from '../Mocks/goatMeals';
import mealCategories from '../Mocks/mealCategories';
import mealsByFirstLetter from '../Mocks/mealsByFirstLetter';
import mealsByIngredient from '../Mocks/mealsByIngredient';
import mealsByName from '../Mocks/mealsByName';
import mealsList from '../Mocks/mealsList';
import milkDrinks from '../Mocks/milkDrinks';
import oneDrinkId15997 from '../Mocks/ondeDrinkId15997';
import ordinaryDrinks from '../Mocks/ordinaryDrinks';
import otherDrinks from '../Mocks/otherDrinks';

export const mockMealsFetch = (url: any) => Promise.resolve({
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(mealCategories); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(mealsList); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken') return Promise.resolve(mealsByIngredient);
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') return Promise.resolve(beefMeals);
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast') return Promise.resolve(breakfastMeals);
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert') return Promise.resolve(dessertMeals);
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat') return Promise.resolve(goatMeals);
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=C') return Promise.resolve(mealsByFirstLetter);
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken') return Promise.resolve(mealsByName);
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken') return Promise.resolve(chickenMeals);
  },
});

export const mockDrinksFetch = (url: any) => Promise.resolve({
  json: () => {
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(drinkCategories); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(drinksList); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink') return Promise.resolve(ordinaryDrinks);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail') return Promise.resolve(cocktailDrinks);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake') return Promise.resolve(milkDrinks);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin') return Promise.resolve(ginDrinks);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown') return Promise.resolve(otherDrinks);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa') return Promise.resolve(cocoaDrinks);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') return Promise.resolve(oneDrinkId15997);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=A') return Promise.resolve(drinksByFirstLetter);
  },
});

export const mockRecipeDetails = (url:string) => Promise.resolve({
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(mealsList); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(mealCategories); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') return Promise.resolve(corba);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') return Promise.resolve(gg);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinksList);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(drinkCategories);
  },
});
