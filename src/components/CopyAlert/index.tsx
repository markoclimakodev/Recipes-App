import styles from './alert.module.css';

function CopyAlert() {
  return (
    <section className={ styles.alert_container }>
      <span className={ styles.alert_message }>Link copied!</span>
    </section>
  );
}

export default CopyAlert;
