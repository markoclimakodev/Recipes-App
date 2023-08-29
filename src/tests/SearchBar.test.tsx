import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { mockDrinksFetch, mockMealsFetch } from './helpers/mockFetch';
import renderWithRouter from './helpers/renderWithRouter';

const idBtnOpenSearchBar = 'search-top-btn';
const idSearchInput = 'search-input';
const idBtnSearch = 'exec-search-btn';
const idRadioIngredient = 'ingredient-search-radio';
const idFistLetterRadio = 'first-letter-search-radio';
const idNameRadio = 'name-search-radio';

describe('Testes do componente SearchBar', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockMealsFetch as any);
    window.alert = vi.fn(() => {});
  });

  test('Verifica se SearchBar e renderizado', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const openSearchBar = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(openSearchBar);
    await screen.findByTestId(idSearchInput);
    await screen.findByTestId(idRadioIngredient);
    await screen.findByTestId('name-search-radio');
    await screen.findByTestId(idFistLetterRadio);
    await screen.findByTestId('exec-search-btn');
  });

  test('Verifica se um alert e exibido caso a busca seja feita com mais de 1 letra em fist Letter', async () => {
    window.alert = vi.fn();
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const openSearchBar = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(openSearchBar);
    const searchInput = await screen.findByTestId(idSearchInput);
    const searchButton = await screen.findByTestId(idBtnSearch);
    const radioFistletter = await screen.findByTestId(idFistLetterRadio);
    await userEvent.type(searchInput, 'Ca');
    await userEvent.click(radioFistletter);
    await userEvent.click(searchButton);
    expect(window.alert).toBeCalled();
  });

  test('Verifica se a busca por somente a primeira letra funciona', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const openSearchBar = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(openSearchBar);
    const searchInput = await screen.findByTestId(idSearchInput);
    const radioFistletter = await screen.findByTestId(idFistLetterRadio);
    const searchButton = await screen.findByTestId(idBtnSearch);
    await userEvent.type(searchInput, 'C');
    await userEvent.click(radioFistletter);
    await userEvent.click(searchButton);

    await screen.findByText('Chocolate Gateau');
  });

  test('Verifica se a busca por ingrediente funciona', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const openSearchBar = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(openSearchBar);
    const searchInput = await screen.findByTestId(idSearchInput);
    const radioIngredient = await screen.findByTestId(idRadioIngredient);
    const searchButton = await screen.findByTestId(idBtnSearch);
    await userEvent.type(searchInput, 'Chicken');
    await userEvent.click(radioIngredient);
    await userEvent.click(searchButton);

    await screen.findByText('Brown Stew Chicken');
  });

  test('Verifica se a busca por nome funciona', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const openSearchBar = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(openSearchBar);
    const searchInput = await screen.findByTestId(idSearchInput);
    const radioName = await screen.findByTestId(idNameRadio);
    const searchButton = await screen.findByTestId(idBtnSearch);
    await userEvent.type(searchInput, 'chicken');
    await userEvent.click(radioName);
    await userEvent.click(searchButton);

    await screen.findByRole('img', { name: /chicken handi/i });
  });

  test('Verifica se um Alert e exibido caso ocorra um erro na API', async () => {
    window.alert = vi.fn();
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const openSearchBar = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(openSearchBar);
    const searchInput = await screen.findByTestId(idSearchInput);
    const searchButton = await screen.findByTestId(idBtnSearch);
    const radioIngredient = await screen.findByTestId(idRadioIngredient);
    try {
      await userEvent.type(searchInput, 'Potatoess');
      await userEvent.click(radioIngredient);
      global.fetch = vi.fn().mockRejectedValue(new Error('Erro'));
      await userEvent.click(searchButton);
    } catch (error) {
      expect(window.alert).toBeCalled();
    }
  });

  test('verifica se exibe um alerta caso nao encontre resultados', async () => {
    window.alert = vi.fn();
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const openSearchBar = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(openSearchBar);
    const searchInput = await screen.findByTestId(idSearchInput);
    const searchButton = await screen.findByTestId(idBtnSearch);
    const radioIngredient = await screen.findByTestId(idRadioIngredient);
    await userEvent.type(searchInput, 'Potatoes');
    await userEvent.click(radioIngredient);
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ meals: null }),
    });
    await userEvent.click(searchButton);
    expect(window.alert).toBeCalled();
  });
});

describe('', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockDrinksFetch as any);
    window.alert = vi.fn(() => {});
  });

  test('Testa se a busca por drinks renderiza corretamente', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });

    const search = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(search);
    const searchInput = await screen.findByTestId(idSearchInput);
    const searchButton = await screen.findByTestId(idBtnSearch);
    const radioIngredient = await screen.findByTestId(idRadioIngredient);
    await user.type(searchInput, 'Chicken');
    await user.click(radioIngredient);
    await user.click(searchButton);
    screen.findByText('Pour the Galliano liqueur over ice.');
  });
  test('verifica o redirecionamento', async () => {
    window.alert = vi.fn();
    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    const openSearchBar = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(openSearchBar);
    const gg = await screen.findByRole('img', { name: /gg/i });
    await user.click(gg);
    await waitFor(() => {
      screen.getByRole('list');
    });
  });
});
