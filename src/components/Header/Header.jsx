import FilterCountry from "../FilterCountry/FilterCountry";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Header.module.css";

function Header({ dispatch, query }) {
  return (
    <div className={styles.section}>
      <SearchBar dispatch={dispatch} query={query} />
      <FilterCountry />
    </div>
  );
}

export default Header;
