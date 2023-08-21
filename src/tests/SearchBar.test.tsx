import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from '../App';
import { unityMeal } from './Mocks/Meals';
import { mockFetchDrinks, mockFetchMeals, renderWithRouterAndMock, loginAndSearch } from './Mocks/Helpers';

describe('Testes do componente SearchBar', () => {
  const idSearchInput = 'search-input';
  const idBtnSearch = 'exec-search-btn';
  const idRadioIngredient = 'ingredient-search-radio';
  const idFistLetterRadio = 'first-letter-search-radio';
  test('Verifica se SearchBar e renderizado', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    await loginAndSearch();
    screen.getByTestId(idSearchInput);
    screen.getByTestId(idRadioIngredient);
    screen.getByTestId('name-search-radio');
    screen.getByTestId(idFistLetterRadio);
    screen.getByTestId('exec-search-btn');
  });

  test('Verifica se quando a API retornar um unico resultado o usuario e redirecionado', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (unityMeal),
    });
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    await loginAndSearch();
    const searchInput = screen.getByTestId(idSearchInput);
    const searchButton = screen.getByTestId(idBtnSearch);
    const radioName = screen.getByTestId('name-search-radio');
    await userEvent.type(searchInput, 'Corba');
    await userEvent.click(radioName);
    await userEvent.click(searchButton);
    expect(window.location.pathname).toBe('/meals'); // depois de implementar as rotas dinamicas alterar para /meals/52977
  });

  test('Verifica se um alert e exibido caso a busca seja feita com mais de 1 letra em fist Letter', async () => {
    window.alert = vi.fn();
    renderWithRouterAndMock(<App />, mockFetchMeals);
    await loginAndSearch();
    const searchInput = screen.getByTestId(idSearchInput);
    const searchButton = screen.getByTestId(idBtnSearch);
    const radioFistletter = screen.getByTestId(idFistLetterRadio);
    await userEvent.type(searchInput, 'Ca');
    await userEvent.click(radioFistletter);
    await userEvent.click(searchButton);
    expect(window.alert).toBeCalled();
  });

  test('Verifica se a busca por somente a primeira letra funciona', async () => {
    renderWithRouterAndMock(<App />, mockFetchMeals);
    await loginAndSearch();
    const searchInput = screen.getByTestId(idSearchInput);
    const searchButton = screen.getByTestId(idBtnSearch);
    const radioFistletter = screen.getByTestId('first-letter-search-radio');
    await userEvent.type(searchInput, 'C');
    await userEvent.click(radioFistletter);
    await userEvent.click(searchButton);
    screen.findByText('Corba');
  });

  test('Verifica se a busca por ingrediente funciona', async () => {
    renderWithRouterAndMock(<App />, mockFetchMeals);
    await loginAndSearch();
    const searchInput = screen.getByTestId(idSearchInput);
    const searchButton = screen.getByTestId(idBtnSearch);
    const radioIngredient = screen.getByTestId(idRadioIngredient);
    await userEvent.type(searchInput, 'Potatoes');
    await userEvent.click(radioIngredient);
    await userEvent.click(searchButton);
    screen.findAllByTestId('0-recipe-card');
  });

  test('Verifica se um Alert e exibido caso ocorra um erro na API', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Erro'));
    window.alert = vi.fn();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    await loginAndSearch();
    const searchInput = screen.getByTestId(idSearchInput);
    const searchButton = screen.getByTestId(idBtnSearch);
    const radioIngredient = screen.getByTestId(idRadioIngredient);
    await userEvent.type(searchInput, 'Potatoes');
    await userEvent.click(radioIngredient);
    await userEvent.click(searchButton);
    expect(window.alert).toBeCalled();
  });

  test('Testa se a busca por drinks renderiza corretamente', async () => {
    renderWithRouterAndMock(<App />, mockFetchDrinks, '/drinks');
    const search = screen.getByTestId('search-top-btn');
    await userEvent.click(search);
    const searchInput = screen.getByTestId(idSearchInput);
    const searchButton = screen.getByTestId(idBtnSearch);
    const radioIngredient = screen.getByTestId(idRadioIngredient);
    await userEvent.type(searchInput, 'Galliano');
    await userEvent.click(radioIngredient);
    await userEvent.click(searchButton);
    screen.findByText('Pour the Galliano liqueur over ice.');
  });
});
