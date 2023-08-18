import { useLocation } from 'react-router-dom';

import styles from './header.module.css';

function Header() {
  const location = useLocation();
  const title = location.pathname.replace('/', '');

  return (
    <header>
      <section>
        <img src="/src/images/logo.svg" alt="logo" />
        <h1 data-testid="page-title">Recipes app</h1>

        {title !== 'profile' && (
          <button
            data-testid="search-top-btn"
            type="button"
          >
            <img src="/src/images/searchIcon.svg" alt="search icon" />
          </button>
        )}
        <a
          href="/profile"
          data-testid="profile-top-btn"
        >
          <img src="/src/images/profileIcon.svg" alt="profile icon" />
        </a>
      </section>
      <section>
        <h2 className={ styles.page_title } data-testid="page-title">{title}</h2>
      </section>
    </header>
  );
}

export default Header;
