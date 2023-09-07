import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import ActionButtons from '../ActionButtons';
import CopyAlert from '../CopyAlert';

import { RecipesContext } from '../../context/recipesContext';
import favoritedIcon from '../../images/blackHeartIcon.svg';

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
    const recipeDetailsLink = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(recipeDetailsLink);
    setCopyLink(true);
  };

  const handleCloseMessage = () => {
    setCopyLink(false);
  };

  return (
    <>
      { type === 'meal' && (
        <section id={ id }>
          <button
            type="button"
            onClick={ () => navigate(`/${type}s/${id}`) }
          >
            <img
              width={ 100 }
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt={ name }
            />
          </button>
          <section>
            <section>

              <button
                type="button"
                onClick={ () => navigate(`/${type}s/${id}`) }
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
            {copyLink && <CopyAlert handleClose={ handleCloseMessage } />}

          </section>

        </section>
      )}
      { type === 'drink' && (
        <section>
          <button type="button" onClick={ () => navigate(`/${type}s/${id}`) }>
            <img
              width={ 100 }
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt={ name }
            />
          </button>
          <section>
            <section>

              <button
                onClick={ () => navigate(`/${type}s/${id}`) }
                type="button"
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
            {copyLink && <CopyAlert handleClose={ handleCloseMessage } />}

          </section>

        </section>
      )}
    </>

  );
}

export default CardFavoriteRecipes;
