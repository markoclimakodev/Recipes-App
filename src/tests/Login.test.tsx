import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from './Mocks/Helpers';
import { mockMealsFetch } from './helpers/mockFetch';

describe('Testes do componente Login', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    vi.spyOn(global, 'fetch').mockImplementation(mockMealsFetch as any);
  });

  test('Verifica se os inputs de email e senha estão na tela', () => {
    renderWithRouter(<App />);

    screen.getByTestId('email-input');
    screen.getByTestId('password-input');
    screen.getByTestId('login-submit-btn');
  });

  test('Testa se a verificação de email e senha está funcionando', async () => {
    const { user } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnSubmit = screen.getByTestId('login-submit-btn');
    expect(btnSubmit).toBeDisabled();
    await user.type(inputEmail, 'alguem@gmail.com');
    await user.type(inputPassword, '1234567');
    await user.click(btnSubmit);
    expect(btnSubmit).toBeEnabled();
  });
});
