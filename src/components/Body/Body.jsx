import CountryList from "../CountryList/CountryList";
import styles from "./Body.module.css";

function Body({ countries, status }) {
  return (
    <div className={styles.section}>
      <CountryList countries={countries} status={status} />
    </div>
  );
}

export default Body;
