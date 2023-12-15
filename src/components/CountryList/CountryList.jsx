import { Link } from "react-router-dom";
import CountryItem from "../CountryItem/CountryItem";
import styles from "./CountryList.module.css";
import { useCountries } from "../../contexts/CountriesContext";
import Loader from "../Loader/Loader";

function CountryList() {
  const { countries, status } = useCountries();

  if (status === "loading") return <Loader />;

  return (
    <div className={styles.list}>
      {countries?.map((country) => (
        <Link key={country.cca2} to={`${country.name.common}`.toLowerCase()}>
          <CountryItem country={country} />
        </Link>
      ))}
    </div>
  );
}

export default CountryList;
