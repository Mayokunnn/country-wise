import CountryList from "../CountryList/CountryList";
import styles from "./Body.module.css";

function Body() {
  return (
    <div className={styles.section}>
      <CountryList />
    </div>
  );
}

export default Body;
