import styles from "./CountryDetails.module.css";
import Loader from "../Loader/Loader";
import { useCountries } from "../../contexts/CountriesContext";
import { useNavigate } from "react-router-dom";

function getFirstValue(
  obj = { key1: "value1", key2: "value2", key3: "value3" }
) {
  // Convert object to array of key-value pairs
  const entries = Object.entries(obj);

  // Check if there are any entries in the object
  if (entries.length > 0) {
    // Retrieve the first key-value pair
    const firstEntry = entries[0];

    // Extract and return the first value
    return firstEntry[1];
  } else {
    // Return null or handle the case when the object is empty
    return null;
  }
}

function CountryDetails() {
  const { country, status, countries } = useCountries();

  const navigate = useNavigate();

  // console.log(country);

  const borders = country?.borders?.map((border) =>
    countries.filter((coun) => coun.cca3 === border)
  );

  if (status === "loading") return <Loader />;

  return (
    <div className={styles.main}>
      <div className={styles.flag}>
        <img src={country?.flags?.png} alt={country?.name?.common} />
      </div>
      <div className={styles.details}>
        <h2>{country?.name?.common} </h2>
        <div className={styles.info}>
          <div>
            <p>
              Native Name:{" "}
              <span>{getFirstValue(country?.name?.nativeName)?.official}</span>
            </p>
            <p>
              Population: <span>{country?.population?.toLocaleString()}</span>
            </p>
            <p>
              Region: <span>{country?.region}</span>
            </p>
            <p>
              Sub Region: <span>{country?.subregion}</span>
            </p>
            <p>
              Capital: <span>{country?.capital}</span>
            </p>
          </div>
          <div>
            <p>
              Top Level Domain:{" "}
              <span>
                {typeof country?.tld === "string"
                  ? country?.tld
                  : country?.tld?.[0]}
              </span>
            </p>
            <p>
              Currencies: <span>{getFirstValue(country?.currencies).name}</span>
            </p>
            <p>
              Language(s): <span>{getFirstValue(country?.languages)}</span>
            </p>
          </div>
        </div>
        <div className={styles.borderCountries}>
          <p>Border Countries: </p>
          <div>
            {borders?.map(
              (border, i) =>
                i < 3 && (
                  <span
                    onClick={() =>
                      navigate(`/${border?.[0]?.name?.common}`.toLowerCase())
                    }
                    key={border.cca2}
                  >
                    {border?.[0]?.name?.common}
                  </span>
                )
            )}
            {/* <span>France</span>
            <span>Germany</span>
            <span>Netherlands</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
