import styles from "./CountryDetails.module.css";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { useCountries } from "../../contexts/CountriesContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
  const { getCountry, country, status, allCountries } = useCountries();
  const [borders, setBorders] = useState([]);
  const { name } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getCountry(name);
  }, [name]);

  useEffect(() => {
    async function getBorders() {
      // Clear the borders before fetching new ones
      setBorders([]);

      const borders = await country?.borders?.map((border) => {
        return allCountries.filter((coun) => {
          return coun.cca3 === border;
        });
      });
      setBorders(borders);
    }
    getBorders();
  }, [country, country?.borders, allCountries]);

  if (!name) navigate("/");

  if (status === "error") return <Message>No data from this country</Message>;

  if (status === "loading") return <Loader />;

  if (!country) return null;

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
        {borders && (
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
                      key={border?.[0]?.cca2}
                    >
                      {border?.[0]?.name?.common}
                    </span>
                  )
              )}
            </div>
          </div>
        )}{" "}
      </div>
    </div>
  );
}

export default CountryDetails;
