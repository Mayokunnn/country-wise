import styles from "./Message.module.css";

function Message({ children }) {
  return (
    <div className={styles.messageContainer}>
      <h1>{children}</h1>
    </div>
  );
}

export default Message;
