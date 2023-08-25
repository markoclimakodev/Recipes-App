import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from './Mocks/Helpers';
import { mockMealsFetch } from './helpers/mockFetch';

// const idDrinkBottonBtn = 'drinks-bottom-btn';
// const idMealBottonBtn = 'meals-bottom-btn';
const otherUnknownTestId = 'Other / Unknown-category-filter';

const beefTestId = 'Beef-category-filter';

describe('testa o footer e suas funções na pagina /meals', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockMealsFetch as any);
  });

  test('testa se os icones de bebidas e comidas estão na tela e redirecionam', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    expect(drinksIcon).toBeInTheDocument();
    expect(mealsIcon).toBeInTheDocument();

    await user.click(drinksIcon);

    expect(window.location.pathname).toBe('/drinks');


    // await user.click(mealsIcon);

    // await screen.findByTestId(beefTestId);
  });
});

// describe('testa o footer e suas funções na pagina /drinks', () => {
//   afterEach(() => {
//     vi.clearAllMocks();
//   });

//   beforeEach(async () => {
//     global.fetch = vi.fn().mockImplementation(mockDrinksFetch as any);
//   });
//   // test('testa se os icones de bebidas e comidas estão na tela e redirecionam', async () => {
//   //   const { user } = renderWithRouter(<App />, '/meals');
//   //   const drinksIcon = screen.getByTestId('drinks-bottom-btn');
//   //   const mealsIcon = screen.getByTestId('meals-bottom-btn');
//   //   expect(drinksIcon).toBeInTheDocument();
//   //   expect(mealsIcon).toBeInTheDocument();

//   //   user.click(drinksIcon);
//   //   await waitFor(() => expect(screen.getByTestId('page-title')).toHaveTextContent(/drinks/i));

//   //   user.click(mealsIcon);
//   //    await screen.findByTestId('page-title')
//   // });
// });
