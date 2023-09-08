import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';
import doneIcon from '../../images/doneRecipesPageIcon.svg';
import favoriteIcon from '../../images/favoritesPageIcon.svg';
import logoutIcon from '../../images/Logout.svg';

function Profile() {
  const navigate = useNavigate();
  const { email } = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <section className={ styles.profileContainer }>
      <section className={ styles.emailContainer }>
        <p data-testid="profile-email">
          { email }
        </p>
      </section>

      <section className={ styles.buttonsContainer }>

        <div className={ styles.btnsDiv }>
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => navigate('/done-recipes') }
          >
            <img src={ doneIcon } alt="icon Done Recipes" />
            Done Recipes
          </button>
        </div>

        <div className={ styles.btnsDiv }>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => navigate('/favorite-recipes') }
          >
            <img src={ favoriteIcon } alt="icon favorites" />
            Favorite Recipes
          </button>
        </div>

        <div className={ styles.btnsDiv }>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handleLogout }
          >
            <img src={ logoutIcon } alt="icon logout" />
            Logout
          </button>
        </div>

      </section>

    </section>
  );
}

export default Profile;
