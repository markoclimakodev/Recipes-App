import { mockFetchDrinks, renderWithRouterAndMock } from './Mocks/Helpers';
import App from '../App';

describe('Testes do componente DoneRecipes', () => {
  it('Testa se a pagina contem um titulo', () => {
    const { screen } = renderWithRouterAndMock(<App />, mockFetchDrinks, '/done-recipes');
    const textRecipes = screen.getByTestId('page-title');
    expect(textRecipes).toBeInTheDocument();
  });
});

describe('Testes do componente FavoriteRecipes', () => {
  it('Testa se a pagina contem um titulo', () => {
    const { screen } = renderWithRouterAndMock(<App />, mockFetchDrinks, '/favorite-recipes');
    const textRecipes = screen.getByTestId('page-title');
    expect(textRecipes).toBeInTheDocument();
  });
});
