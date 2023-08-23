import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import cocktailMock from './Mocks/FIlteredCategoryDrinks';
import beefMock from './Mocks/FilteredCategoryMeals';
import { mockDrinksCategories, mockmealsCategories, renderWithRouterAndMock } from './Mocks/Helpers';
import ordinaryDrinksMock from './Mocks/filteredCategoryOrdinary';

const recipeCard = '0-recipe-card';
const allCategory = 'All-category-filter';

describe('Recipes', () => {
  test('testa se a pagina de drinks tem os botoes de categoria', async () => {
    renderWithRouterAndMock(<App />, mockDrinksCategories, '/drinks');
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (cocktailMock),
    });

    const ordinaryDrinkBtn = await screen.findByTestId('Ordinary Drink-category-filter');
    const cocktailBtn = await screen.findByTestId('Cocktail-category-filter');
    const shakeBtn = await screen.findByTestId('Shake-category-filter');
    const cocoaBtn = await screen.findByTestId('Cocoa-category-filter');
    const otherBtn = await screen.findByTestId('Other/Unknown-category-filter');
    const allBtn = await screen.findByTestId(allCategory);
    expect(otherBtn).toBeInTheDocument();
    expect(cocoaBtn).toBeInTheDocument();
    expect(shakeBtn).toBeInTheDocument();
    expect(ordinaryDrinkBtn).toBeInTheDocument();
    expect(cocktailBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();

    await userEvent.click(ordinaryDrinkBtn);
    await screen.findByTestId('0-recipe-card');
  });
});

describe('Recipes dnv', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('testa se a pagina de drinks tem os botoes de categoria', async () => {
    renderWithRouterAndMock(<App />, mockDrinksCategories, '/drinks');
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (ordinaryDrinksMock),
    });

    const ordinaryDrinkBtn = await screen.findByTestId('Ordinary Drink-category-filter');
    const cocktailBtn = await screen.findByTestId('Cocktail-category-filter');
    const shakeBtn = await screen.findByTestId('Shake-category-filter');
    const cocoaBtn = await screen.findByTestId('Cocoa-category-filter');
    const otherBtn = await screen.findByTestId('Other/Unknown-category-filter');
    const allBtn = await screen.findByTestId(allCategory);
    expect(otherBtn).toBeInTheDocument();
    expect(cocoaBtn).toBeInTheDocument();
    expect(shakeBtn).toBeInTheDocument();
    expect(ordinaryDrinkBtn).toBeInTheDocument();
    expect(cocktailBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();

    await userEvent.click(shakeBtn);
    await screen.findByTestId(recipeCard);
  });
});

describe('verifica se ao clicar em uma categoria, os cards mudam', () => {
  test('verifica se ao clicar em uma categoria, os cards mudam', async () => {
    renderWithRouterAndMock(<App />, mockmealsCategories, '/meals');
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (beefMock),
    });

    const beefBtn = await screen.findByTestId('Beef-category-filter');
    const breakfastBtn = await screen.findByTestId('Breakfast-category-filter');
    const chickenBtn = await screen.findByTestId('Chicken-category-filter');
    const dessertBtn = await screen.findByTestId('Dessert-category-filter');
    const goatBtn = await screen.findByTestId('Goat-category-filter');
    const allBtn = await screen.findByTestId(allCategory);
    expect(beefBtn).toBeInTheDocument();
    expect(breakfastBtn).toBeInTheDocument();
    expect(chickenBtn).toBeInTheDocument();
    expect(dessertBtn).toBeInTheDocument();
    expect(goatBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();

    await userEvent.click(beefBtn);
    await screen.findByTestId(recipeCard);
  });
});

describe('verifica se o botao de all funciona', () => {
  test('verifica se o botao de all funciona', async () => {
    renderWithRouterAndMock(<App />, mockmealsCategories, '/meals');
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (beefMock),
    });

    const beefBtn = await screen.findByTestId('Beef-category-filter');
    const breakfastBtn = await screen.findByTestId('Breakfast-category-filter');
    const chickenBtn = await screen.findByTestId('Chicken-category-filter');
    const dessertBtn = await screen.findByTestId('Dessert-category-filter');
    const goatBtn = await screen.findByTestId('Goat-category-filter');
    const allBtn = await screen.findByTestId(allCategory);
    expect(beefBtn).toBeInTheDocument();
    expect(breakfastBtn).toBeInTheDocument();
    expect(chickenBtn).toBeInTheDocument();
    expect(dessertBtn).toBeInTheDocument();
    expect(goatBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();

    await userEvent.click(beefBtn);
    await screen.findByTestId(recipeCard);

    await userEvent.click(allBtn);
    await screen.findByTestId(recipeCard);
  });
});
