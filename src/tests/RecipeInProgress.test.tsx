import { screen } from '@testing-library/react';
import { vi } from 'vitest';
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
});
