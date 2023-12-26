import styles from "./Main.module.css";
import PropTypes from "prop-types";

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

function Main({ children, style = {} }) {
  return (
    <div style={style} className={styles.main}>
      {children}
    </div>
  );
}

export default Main;
