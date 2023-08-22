import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import { mockDrinksCategories, renderWithRouterAndMock } from './Mocks/Helpers';
import drinks from './Mocks/FIlterDrinkMock';

describe('Recipes', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('testa se a pagina de drinks tem os botoes de categoria', async () => {
    renderWithRouterAndMock(<App />, mockDrinksCategories, '/drinks');

    // const filtersBtn = ['Ordinary Drink-category-filter', 'Cocktail-category-filter', 'Shake-category-filter', 'Cocoa-category-filter', 'Other / Unknown-category-filter'];
    drinks.drinks.slice(0, 5).forEach(async ({ strCategory: category }) => {
      const categoryBtn = await screen.findByTestId(`${category}-category-filter`);
      expect(categoryBtn).toBeInTheDocument();
    });
  });
});
