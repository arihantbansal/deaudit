import styles from "@styles/Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.spinnerBox}>
      <div className={styles.pulseContainer}>
        <div className={`${styles.pulseBubble} ${styles.pulseBubble1}`}></div>
        <div className={`${styles.pulseBubble} ${styles.pulseBubble2}`}></div>
        <div className={`${styles.pulseBubble} ${styles.pulseBubble3}`}></div>
      </div>
    </div>
  );
};

export default Loading;
