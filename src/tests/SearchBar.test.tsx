import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { unitMeal } from './Mocks/Meals';

const loginApp = async () => {
  const inputEmail = screen.getByTestId('email-input');
  const inputPassword = screen.getByTestId('password-input');
  const btnSubmit = screen.getByTestId('login-submit-btn');
  await userEvent.type(inputEmail, 'alguem@gmail.com');
  await userEvent.type(inputPassword, '1234567');
  await userEvent.click(btnSubmit);
};

describe('Testes do componente SearchBar', () => {
  test('Verifica se SearchBar e renderizado', async () => {
    render(<App />);
    await loginApp();
    const search = screen.getByTestId('search-top-btn');
    await userEvent.click(search);
    screen.getByTestId('search-input');
    screen.getByTestId('ingredient-search-radio');
    screen.getByTestId('name-search-radio');
    screen.getByTestId('first-letter-search-radio');
    screen.getByTestId('exec-search-btn');
  });

  test('Verifica se quando a API retornar um unico resultado o usuario e redirecionado', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (unitMeal),
    });
    render(<App />);
    const search = screen.getByTestId('search-top-btn');
    await userEvent.click(search);
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('exec-search-btn');
    const radioName = screen.getByTestId('name-search-radio');
    await userEvent.type(searchInput, 'Corba');
    await userEvent.click(radioName);
    await userEvent.click(searchButton);
    screen.debug();
    expect(window.location.pathname).toBe('/meals/52977');
  });
});
