import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipesContext } from '../../context/recipesContext';
import shareIcon from '../../images/shareIcon.svg';
import ActionButtons from '../ActionButtons';
import CopyAlert from '../CopyAlert';

import favoritedIcon from '../../images/blackHeartIcon.svg';

import styles from './favorite-recipes-card.module.css';

type CardFavoriteRecipesProps = {
  index: number;
  id: string,
  nationality:string,
  name: string,
  category: string,
  type: string,
  image: string,
  alcoholicOrNot: string,
};
function CardFavoriteRecipes(props: CardFavoriteRecipesProps) {
  const { category, alcoholicOrNot,
    id, image, index, name, nationality, type } = props;
  const [copyLink, setCopyLink] = useState(false);
  const navigate = useNavigate();
  const { favoriteRecipes, handleRemoveFavoriteRecipe,
  } = useContext(RecipesContext);

  const handleFavoriteRecipe = () => {
    const isRecipeAlreadyFavorited = favoriteRecipes
      .some((recipes) => recipes.id === id);
    if (isRecipeAlreadyFavorited) {
      handleRemoveFavoriteRecipe(id);
    }
  };
  const handleCopyToClipboard = () => {
    setCopyLink(true);
    const recipeDetailsLink = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(recipeDetailsLink);
    setTimeout(() => {
      setCopyLink(false);
    }, 1000);
  };

  return (
    <>
      { type === 'meal' && (
        <section id={ id } className={ styles.favorite_card_container }>
          <button
            type="button"
            onClick={ () => navigate(`/${type}s/${id}`) }
            className={ styles.img_btn }
          >
            <img
              width={ 100 }
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt={ name }
            />
          </button>
          {copyLink && <CopyAlert />}

          <section
            className={ styles.card_info_container }
          >
            <section className={ styles.card_header }>

              <button
                type="button"
                onClick={ () => navigate(`/${type}s/${id}`) }
                className={ styles.card_info }

              >
                <h2 data-testid={ `${index}-horizontal-name` }>
                  { name }
                </h2>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${nationality} - ${category}`}
                </p>
              </button>
            </section>
            <section className={ styles.actions_contaiener }>
              <ActionButtons
                icon={ shareIcon }
                alt="share"
                testId={ `${index}-horizontal-share-btn` }
                onClick={ handleCopyToClipboard }
              />
              <ActionButtons
                icon={ favoritedIcon }
                alt="share"
                testId={ `${index}-horizontal-favorite-btn` }
                onClick={ handleFavoriteRecipe }
              />
            </section>
          </section>

        </section>
      )}
      { type === 'drink' && (
        <section
          className={ styles.favorite_card_container }
        >
          <button
            type="button"
            onClick={ () => navigate(`/${type}s/${id}`) }
            className={ styles.img_btn }
          >
            <img
              width={ 100 }
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt={ name }
            />
          </button>
          {copyLink && <CopyAlert />}
          <section
            className={ styles.card_info_container }
          >
            <section className={ styles.card_header }>
              <button
                onClick={ () => navigate(`/${type}s/${id}`) }
                type="button"
                className={ styles.card_info }
              >
                <h2
                  data-testid={ `${index}-horizontal-name` }
                >
                  { name }
                </h2>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${nationality} - ${alcoholicOrNot}`}
                </p>
              </button>
            </section>
            <section className={ styles.actions_contaiener }>
              <ActionButtons
                icon={ shareIcon }
                alt="share"
                testId={ `${index}-horizontal-share-btn` }
                onClick={ handleCopyToClipboard }
              />
              <ActionButtons
                icon={ favoritedIcon }
                alt="share"
                testId={ `${index}-horizontal-favorite-btn` }
                onClick={ handleFavoriteRecipe }
              />
            </section>
          </section>

        </section>
      )}
    </>

  );
}

export default CardFavoriteRecipes;
