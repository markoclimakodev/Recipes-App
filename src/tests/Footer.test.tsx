import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('testa o footer e suas funções', () => {
  test('testa se os icones de bebidas e comidas estão na tela e redirecionam', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    expect(drinksIcon).toBeInTheDocument();
    expect(mealsIcon).toBeInTheDocument();

    userEvent.click(drinksIcon);
    await waitFor(() => expect(screen.getByTestId('page-title')).toHaveTextContent(/drinks/i));

    userEvent.click(mealsIcon);
    await waitFor(() => expect(screen.getByTestId('page-title')).toHaveTextContent(/meals/i));
  });
});
