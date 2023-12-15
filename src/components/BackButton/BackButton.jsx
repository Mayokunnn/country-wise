import styles from "./BackButton.module.css";
function BackButton({ onClick }) {
  return (
    <div className={styles.btn} onClick={onClick}>
      &larr; Back{" "}
    </div>
  );
}

export default BackButton;
