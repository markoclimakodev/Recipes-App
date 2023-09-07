import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButtons from '../ActionButtons';
import shareIcon from '../../images/shareIcon.svg';
import CopyAlert from '../CopyAlert';

type CardDoneRecipesProps = {
  index: number;
  id: string,
  nationality:string,
  name: string,
  category: string,
  doneDate:string,
  type: string,
  image: string,
  tags: string[],
  alcoholicOrNot: string,
};
function CardDoneRecipes(props: CardDoneRecipesProps) {
  const { category, doneDate, alcoholicOrNot,
    id, image, index, name, nationality, tags, type } = props;
  const [copyLink, setCopyLink] = useState(false);
  const navigate = useNavigate();

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
            </section>
            {copyLink && <CopyAlert handleClose={ handleCloseMessage } />}
            <p data-testid={ `${index}-horizontal-done-date` }>
              Done in:
              {' '}
              { doneDate }
            </p>
            <section>
              {tags && tags.map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </p>
              ))}
            </section>

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
            </section>
            {copyLink && <CopyAlert handleClose={ handleCloseMessage } />}
            <p data-testid={ `${index}-horizontal-done-date` }>
              Done in:
              {' '}
              { doneDate }
            </p>
            <section>
              {tags.map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </p>
              ))}
            </section>

          </section>

        </section>
      )}
    </>

  );
}

export default CardDoneRecipes;
