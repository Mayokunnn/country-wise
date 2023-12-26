import Message from "../Message/Message";
import CountryItem from "../CountryItem/CountryItem";
import styles from "./CountryList.module.css";
import { useCountries } from "../../contexts/CountriesContext";
import Loader from "../Loader/Loader";

function CountryList() {
  const { countries, status, query } = useCountries();

  if (query && status === "error")
    return <Message>We know of no such country on earth😂</Message>;

  return (
    <div className={styles.list}>
      {countries?.map((country) => (
        <CountryItem key={country.cca2} country={country} />
      ))}
    </div>
  );
}

export default CountryList;
