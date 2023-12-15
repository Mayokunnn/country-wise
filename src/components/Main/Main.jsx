import styles from "./Main.module.css";
import PropTypes from "prop-types";

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

function Main({ children }) {
  return <div className={styles.main}>{children}</div>;
}

export default Main;
