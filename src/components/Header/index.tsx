import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import { PathNames } from '../../types';

import styles from './header.module.css';
import SearchBar from './SearchBar';

function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  const location = useLocation();

  // const ahaha = path[0].toUpperCase() + path.split('').slice(1).join('');

  const path = location.pathname.replace('/', '');

  const pageInfo: PathNames = {
    meals: { title: 'Meals', icon: '/src/images/mealsPageicon.svg' },
    drinks: { title: 'Drinks', icon: '/src/images/drinksPageIcon.svg' },
    profile: { title: 'Profile', icon: '/src/images/profilePageIcon.svg' },
    'done-recipes': {
      title: 'Done Recipes',
      icon: '/src/images/doneRecipesPageIcon.svg' },
    'favorite-recipes': {
      title: 'Favorite Recipes',
      icon: '/src/images/favoritesPageIcon.svg' },
  };

  const pageTitle = pageInfo[path as keyof PathNames].title;
  const pageIcon = pageInfo[path as keyof PathNames].icon;
  const hideSearchIcon = ['profile', 'done-recipes', 'favorite-recipes'].includes(path);

  const handleOpenSearch = useCallback(() => {
    setOpenSearch(!openSearch);
  }, [openSearch]);

  return (
    <header className={ styles.header }>
      <nav className={ styles.navbar }>
        <img src="/src/images/logo.svg" alt="logo" />

        <section className={ styles.nav_actions }>
          {!hideSearchIcon && (
            <button
              type="button"
              onClick={ handleOpenSearch }
            >
              <img
                src={ searchIcon }
                alt="search icon"
                data-testid="search-top-btn"
              />
            </button>
          )}
          <a
            href="/profile"
          >
            <img
              src={ profileIcon }
              alt="profile icon"
              data-testid="profile-top-btn"
            />
          </a>
        </section>
      </nav>

      <section className={ styles.page_title_container }>
        <img src={ pageIcon } alt="" />
        <h1 data-testid="page-title">{pageTitle}</h1>
      </section>
      {openSearch && (
        <SearchBar pageTitle={ pageTitle } />
      )}

    </header>
  );
}

export default Header;
