import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './login.module.css';
import logoApp from '../../images/logoApp.svg';
import tomatoImg from '../../images/tomato.svg';

const initialState = {
  email: '',
  password: '',
};

function Login() {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: form.email }));
    navigate('/meals');
  };

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const btnActive = (regexEmail.test(form.email) && form.password.length > 6);

  return (
    <main>
      <div className={ styles.backgroundLogin }>
        <img src={ logoApp } alt="logo-app" className={ styles.logoApp } />
        <img src={ tomatoImg } alt="tomate" className={ styles.tomato } />
      </div>
      <form className={ styles.formLogin } onSubmit={ handleSubmitLogin }>
        <h1 className={ styles.heading }>Login</h1>
        <input
          className={ styles.inputLogin }
          name="email"
          type="text"
          data-testid="email-input"
          value={ form.email }
          onChange={ handleChange }
        />
        <input
          className={ styles.inputLogin }
          name="password"
          type="password"
          data-testid="password-input"
          value={ form.password }
          onChange={ handleChange }
        />
        <button
          className={ styles.btnLogin }
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !btnActive }
        >
          Enter
        </button>
      </form>
    </main>
  );
}

export default Login;
