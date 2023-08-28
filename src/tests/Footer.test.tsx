import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import { mockMealsFetch } from './helpers/mockFetch';
import renderWithRouter from './helpers/renderWithRouter';

describe('testa o footer e suas funções na pagina /meals', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockMealsFetch as any);
    window.alert = vi.fn(() => {});
  });

  test('testa se os icones de bebidas e comidas estão na tela e redirecionam', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    expect(drinksIcon).toBeInTheDocument();
    expect(mealsIcon).toBeInTheDocument();

    await user.click(drinksIcon);

    expect(window.location.pathname).toBe('/drinks');

    await user.click(mealsIcon);
    expect(window.location.pathname).toBe('/meals');
  });
});
