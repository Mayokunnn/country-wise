import { useNavigate } from "react-router-dom";
import CountryItem from "../CountryItem/CountryItem";
import styles from "./CountryList.module.css";
import { useCountries } from "../../contexts/CountriesContext";
import Loader from "../Loader/Loader";

function CountryList() {
  const navigate = useNavigate();
  const { countries, status } = useCountries();

  if (status === "loading") return <Loader />;

  return (
    <div className={styles.list}>
      {countries?.map((country) => (
        <CountryItem
          onClick={() => navigate(`${country.name.common}`.toLowerCase())}
          key={country.cca2}
          country={country}
        />
      ))}
    </div>
  );
}

export default CountryList;
