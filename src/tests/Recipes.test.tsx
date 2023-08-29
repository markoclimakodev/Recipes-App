import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { mockDrinksFetch, mockMealsFetch } from './helpers/mockFetch';
import renderWithRouter from './helpers/renderWithRouter';

const idBtnOpenSearchBar = 'search-top-btn';

const allCategory = 'All-category-filter';

const ordinaryDrinkTestId = 'Ordinary Drink-category-filter';
const cocktailTestId = 'Cocktail-category-filter';
const shakeTestId = 'Shake-category-filter';
const cocoaTestId = 'Cocoa-category-filter';
const otherUnknownTestId = 'Other/Unknown-category-filter';

const beefTestId = 'Beef-category-filter';
const breakfastTestId = 'Breakfast-category-filter';
const chickenTestId = 'Chicken-category-filter';
const dessertTestId = 'Dessert-category-filter';
const goatTestId = 'Goat-category-filter';

describe('Recipes', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockDrinksFetch as any);
    window.alert = vi.fn(() => {});
  });

  test('testa se a pagina de drinks tem os botoes de categoria', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });

    const openSearchBar = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(openSearchBar);
    await screen.findByTestId(ordinaryDrinkTestId);
    await screen.findByTestId(cocktailTestId);
    await screen.findByTestId(shakeTestId);
    await screen.findByTestId(cocoaTestId);
    await screen.findByTestId(otherUnknownTestId);
    await screen.findByTestId(allCategory);
  });

  test('verifica se ao clicar no botão Ordinary Drink, os cards mudam', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });

    const openSearchBar = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(openSearchBar);

    const ordinaryBtn = await screen.findByTestId(ordinaryDrinkTestId);

    await userEvent.click(ordinaryBtn);
    await waitFor(() => {
      screen.getByText('3-Mile Long Island Iced Tea');
    });
  });

  test('verifica se ao clicar no botão cocktail, os cards mudam', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });

    const openSearchBar = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(openSearchBar);

    const cocktailBtn = await screen.findByTestId(cocktailTestId);

    await userEvent.click(cocktailBtn);
    await waitFor(() => {
      screen.getByText('155 Belmont');
    });
  });
});

describe('Testa os botões de categoria', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockMealsFetch as any);
    window.alert = vi.fn(() => {});
  });

  test('testa se a pagina  meals tem os botões de categoria', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const openSearchBar = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(openSearchBar);
    await screen.findByTestId(beefTestId);
    await screen.findByTestId(breakfastTestId);
    await screen.findByTestId(chickenTestId);
    await screen.findByTestId(dessertTestId);
    await screen.findByTestId(goatTestId);
    await screen.findByTestId(allCategory);
  });

  test('verifica se ao clicar no botão Beef, os cards mudam', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const openSearchBar = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(openSearchBar);

    const beefBtn = await screen.findByTestId(beefTestId);

    await userEvent.click(beefBtn);
    await waitFor(() => {
      screen.getByText('Beef and Mustard Pie');
    });
  });

  test('verifica se ao clicar no botão Breakfast, os cards mudam', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const openSearchBar = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(openSearchBar);

    const breakfastBtn = await screen.findByTestId(breakfastTestId);

    await userEvent.click(breakfastBtn);
    await waitFor(() => {
      screen.getByText('Home-made Mandazi');
    });
  });

  test('verifica se ao clicar no botão Chicken, os cards mudam', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const openSearchBar = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(openSearchBar);

    const chickenBtn = await screen.findByTestId(chickenTestId);

    await userEvent.click(chickenBtn);

    await screen.findByText('Brown Stew Chicken');
  });

  test('verifica se ao clicar no botão Dessert, os cards mudam', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const openSearchBar = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(openSearchBar);

    const dessertBtn = await screen.findByTestId(dessertTestId);

    await userEvent.click(dessertBtn);
    await waitFor(() => {
      screen.getByText('Bakewell tart');
    });
  });

  test('verifica se ao clicar no botão Goat, os cards mudam', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const openSearchBar = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(openSearchBar);

    const goatBtn = await screen.findByTestId(goatTestId);

    await userEvent.click(goatBtn);
    await waitFor(() => {
      screen.getByText('Mbuzi Choma (Roasted Goat)');
    });
  });

  test('verifica se ao clicar no botão botao de all os filtros são removidos', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const openSearchBar = screen.getByTestId(idBtnOpenSearchBar);
    await user.click(openSearchBar);

    const beefBtn = await screen.findByTestId(beefTestId);
    await userEvent.click(beefBtn);
    await waitFor(() => {
      screen.getByText('Beef and Mustard Pie');
    });
    const allBtn = await screen.findByTestId(allCategory);

    await userEvent.click(allBtn);

    await screen.findByText('Corba');
    await screen.findByText('Kumpir');
  });
});
