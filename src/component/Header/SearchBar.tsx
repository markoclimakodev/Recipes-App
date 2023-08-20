import { useState } from 'react';
import styles from './header.module.css';

const initialState = {
  searchInput: '',
  searchRadio: '',
};

const fetchRecipes = async (searchURL: string) => {
  const response = await fetch(searchURL);
  const data = await response.json();
  return data;
};

function SearchBar() {
  const [formSearch, setFormSearch] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormSearch((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { searchInput, searchRadio } = formSearch;
    if (searchRadio === 'ingredient') {
      fetchRecipes(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
    }
    if (searchRadio === 'name') {
      fetchRecipes(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    }
    if (searchRadio === 'first_letter') {
      if (searchInput.length > 1) {
        window.alert('Your search must have only 1 (one) character');
      }
      fetchRecipes(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
    }
  };

  return (
    <form className={ styles.form } onSubmit={ handleSubmit }>

      <label htmlFor="search-input" className={ styles.search_input_container }>
        <input
          name="searchInput"
          type="text"
          id="search-input"
          placeholder="Search"
          data-testid="search-input"
          value={ formSearch.searchInput }
          onChange={ handleChange }
        />
      </label>

      <fieldset className={ styles.filters_container }>
        <label htmlFor="ingredient">
          <input
            name="searchRadio"
            type="radio"
            id="ingredient"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ handleChange }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            name="searchRadio"
            type="radio"
            id="name"
            data-testid="name-search-radio"
            value="name"
            onChange={ handleChange }
          />
          Name
        </label>
        <label htmlFor="first_letter">
          <input
            name="searchRadio"
            type="radio"
            id="first_letter"
            data-testid="first-letter-search-radio"
            value="first_letter"
            onChange={ handleChange }
          />
          First letter
        </label>
      </fieldset>
      <button
        type="submit"
        data-testid="exec-search-btn"
        className={ styles.search_button }
      >
        Search

      </button>
    </form>
  );
}

export default SearchBar;
