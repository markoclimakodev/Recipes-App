import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import { mockRecipeDetails } from './helpers/mockFetch';
import renderWithRouter from './helpers/renderWithRouter';

const firstRecipe = '0-card-img';
const mealBase = '/meals/52977';

describe('Testa a pagina de detalhes na rota /meals/id', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockRecipeDetails as any);
    window.alert = vi.fn(() => {});
  });

  test('Testa se ao clicar no botão start recipe redireciona para página de recipe in progress', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const corba = await screen.findByTestId(firstRecipe);
    await user.click(corba);
    expect(window.location.pathname).toBe(mealBase);
    const startRecipe = await screen.findByTestId('start-recipe-btn');
    await user.click(startRecipe);
    expect(window.location.pathname).toBe('/meals/52977/in-progress');
  });

  test('Teste se ao clicar no botão compartilhar o link é compiado', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const corba = await screen.findByTestId(firstRecipe);
    await user.click(corba);
    expect(window.location.pathname).toBe(mealBase);

    const shareBtn = await screen.findByTestId('share-btn');
    await user.click(shareBtn);
    await screen.findByText('Link copied!');
  });

  test('Teste se ao clicar no botão favoritar a receita é favoritada ', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const corba = await screen.findByTestId(firstRecipe);
    await user.click(corba);
    expect(window.location.pathname).toBe(mealBase);

    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
    await user.click(favoriteBtn);
  });

  test('testa se a pagina possui os elementos esperados', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const corba = await screen.findByTestId(firstRecipe);
    await user.click(corba);
    expect(window.location.pathname).toBe(mealBase);

    await screen.findByRole('heading', { name: 'Ingredients' });
    await screen.findByRole('heading', { name: 'Instructions' });
    await screen.findByRole('heading', { name: 'Recommended' });
    await screen.findByRole('heading', { name: 'Recommended' });
  });
});
