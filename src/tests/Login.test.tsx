import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Testes do componente Login', () => {
  test('Verifica se os inputs de email e senha estão na tela', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    screen.getByTestId('email-input');
    screen.getByTestId('password-input');
    screen.getByTestId('login-submit-btn');
  });
  test('Testa se a verificação de email e senha está funcionando', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnSubmit = screen.getByTestId('login-submit-btn');
    expect(btnSubmit).toBeDisabled();
    await userEvent.type(inputEmail, 'alguem@gmail.com');
    await userEvent.type(inputPassword, '1234567');
    await userEvent.click(btnSubmit);
    expect(btnSubmit).toBeEnabled();
  });
});
