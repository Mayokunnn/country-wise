import styles from "./CountryDetails.module.css";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { useCountries } from "../../contexts/CountriesContext";
import { useNavigate } from "react-router-dom";
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
  const { country, status, allCountries } = useCountries();
  const [borders, setBorders] = useState([]);

  const navigate = useNavigate();

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

  if (status === "error") return <Message>No data from this country</Message>;

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
            {country?.subregion && (
              <p>
                Sub Region: <span>{country?.subregion}</span>
              </p>
            )}
            {country?.capital && (
              <p>
                Capital: <span>{country?.capital}</span>
              </p>
            )}
          </div>
          <div>
            {country?.tld && (
              <p>
                Top Level Domain:{" "}
                <span>
                  {typeof country?.tld === "string"
                    ? country?.tld
                    : country?.tld?.[0]}
                </span>
              </p>
            )}
            {country?.currencies && (
              <p>
                Currencies:{" "}
                <span>{getFirstValue(country?.currencies).name}</span>
              </p>
            )}
            {country?.languages && (
              <p>
                Language(s): <span>{getFirstValue(country?.languages)}</span>
              </p>
            )}
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
                      key={i}
                      onClick={() =>
                        navigate(`/${border?.[0]?.name?.common}`.toLowerCase())
                      }
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
