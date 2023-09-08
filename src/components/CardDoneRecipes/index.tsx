import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import ActionButtons from '../ActionButtons';
import CopyAlert from '../CopyAlert';

import { formatDate } from '../../helpers/formatDate';
import styles from './done-recipes-card.module.css';

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
        <section id={ id } className={ styles.done_card_container }>
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
            {copyLink && <CopyAlert />}
          </button>
          <section className={ styles.card_info_container }>
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
              <ActionButtons
                icon={ shareIcon }
                alt="share"
                testId={ `${index}-horizontal-share-btn` }
                onClick={ handleCopyToClipboard }
              />
            </section>
            <p data-testid={ `${index}-horizontal-done-date` }>
              Done in:
              {' '}
              {formatDate(doneDate) }
            </p>
            <section className={ styles.tags_container }>
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
        <section id={ id } className={ styles.done_card_container }>
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
            {copyLink && <CopyAlert />}

          </button>
          <section className={ styles.card_info_container }>
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
                  {alcoholicOrNot}
                </p>
              </button>
              <ActionButtons
                icon={ shareIcon }
                alt="share"
                testId={ `${index}-horizontal-share-btn` }
                onClick={ handleCopyToClipboard }
              />
            </section>
            <p data-testid={ `${index}-horizontal-done-date` }>
              Done in:
              {' '}
              {formatDate(doneDate) }

            </p>
            <section className={ styles.tags_container }>
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
