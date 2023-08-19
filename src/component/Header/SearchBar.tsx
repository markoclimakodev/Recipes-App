import styles from './header.module.css';

function SearchBar() {
  return (
    <form className={ styles.form }>

      <label htmlFor="search-input" className={ styles.search_input_container }>
        <input
          type="text"
          id="search-input"
          placeholder="Search"
          data-testid="search-input"
        />
      </label>

      <fieldset className={ styles.filters_container }>
        <label htmlFor="ingredient">
          <input
            type="radio"
            id="ingredient"
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label htmlFor="first_letter">
          <input
            type="radio"
            id="first_letter"
            data-testid="first-letter-search-radio"
          />
          First letter
        </label>
      </fieldset>
      <button
        type="button"
        data-testid="exec-search-btn"
        className={ styles.search_button }
      >
        Search

      </button>
    </form>
  );
}

export default SearchBar;
