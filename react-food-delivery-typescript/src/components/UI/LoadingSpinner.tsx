import styles from "./LoadingSpinner.module.css";

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles['spinner-container']}>
      <div className={styles['loading-spinner']}>
      </div>
    </div>
  );
}

export default LoadingSpinner;
