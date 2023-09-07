import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mockMealsFetch } from './helpers/mockFetch';
import renderWithRouter from './helpers/renderWithRouter';

describe('RecipeInProgress', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockMealsFetch as any);
    window.alert = vi.fn(() => {});
  });
  const WHITE_HEART_SVG = 'whiteHeartIcon.svg';
  test('Testa a tela receitas em progresso', async () => {
    renderWithRouter(<App />, { route: '/meals/53065/in-progress' });
    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipeImage = await screen.findByTestId('recipe-photo');
    const recipeCategory = await screen.findByTestId('recipe-category');
    const ingredientsSection = screen.getByRole('heading', { name: /ingredients/i });
    const recipeInstructions = await screen.findByTestId('instructions');
    const button = await screen.findByTestId('finish-recipe-btn');
    const shareButton = await screen.findByTestId('share-btn');
    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(ingredientsSection).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeImage).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
  });
  test('Testa se o link da receita é copiado ao clicar no botão de compartilhar', async () => {
    renderWithRouter(<App />, { route: '/meals/53065/in-progress' });
    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
    await userEvent.click(shareButton);
    const alert = await screen.findByText('Link copied!');
    expect(alert).toBeInTheDocument();
  });
  test('Testando botão de favoritos', async () => {
    renderWithRouter(<App />, { route: '/drinks/15997/in-progress' });
    const mockStorage = vi.spyOn(Storage.prototype, 'setItem');
    const favoriteBtn = await screen.findByTestId('favorite-btn') as HTMLImageElement;
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn.src).toContain(WHITE_HEART_SVG);
    await userEvent.click(favoriteBtn);
    expect(mockStorage).toHaveBeenCalledTimes(1);
    expect(favoriteBtn.src).toContain(WHITE_HEART_SVG);
    await userEvent.click(favoriteBtn);
    expect(mockStorage).toHaveBeenCalledTimes(2);
    expect(favoriteBtn.src).toContain(WHITE_HEART_SVG);
  });
  test('Ao clicar no botão start recipe redireciona para a tela de receita em progresso', async () => {
    renderWithRouter(<App />, { route: '/drinks/15997' });
    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();
    await userEvent.click(startRecipeBtn);
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
  });
  // test('salva doneRecipe no localStorage', async () => {
  //   renderWithRouter(<App />, { route: '/drinks/15997/in-progress' });
  //   const ingredient1 = await screen.findByRole('checkbox', { name: 'Galliano-2 1/2 shots' });
  //   const ingredient2 = await screen.findByRole('checkbox', { name: 'Ginger ale-' });
  //   const ingredient3 = await screen.findByRole('checkbox', { name: 'Ice-' });

  //   await userEvent.click(ingredient1);
  //   await userEvent.click(ingredient2);
  //   await userEvent.click(ingredient3);

  //   const finishButton = screen.getByRole('button', { name: /finish recipe/i });

  //   await userEvent.click(finishButton);
  // });
});
