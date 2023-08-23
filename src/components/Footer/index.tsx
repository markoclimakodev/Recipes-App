import { useNavigate } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

import styles from './footer.module.css';

function Footer() {
  const navigate = useNavigate();

  return (
    <div className={ styles.footerContainer } data-testid="footer">
      <footer className={ styles.footer }>
        <button
          className={ styles.footerButton }
          type="button"
          onClick={ () => navigate('/drinks') }
        >
          <img
            className={ styles.footerImage }
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="drinks"
          />
        </button>
        <button
          className={ styles.footerButton }
          type="button"
          onClick={ () => navigate('/meals') }
        >
          <img
            className={ styles.footerImage }
            data-testid="meals-bottom-btn"
            src={ mealIcon }
            alt="meals"
          />
        </button>
      </footer>
    </div>
  );
}

export default Footer;
