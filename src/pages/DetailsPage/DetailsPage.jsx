import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import BackButton from "../../components/BackButton/BackButton";
import CountryDetails from "../../components/CountryDetails/CountryDetails";
import Main from "../../components/Main/Main";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./DetailsPage.module.css";
import Loader from "../../components/Loader/Loader";

function DetailsPage({ dispatch, BASE_URL, country, status }) {
  const navigate = useNavigate();
  const { name } = useParams();
  console.log(name);

  useEffect(() => {
    async function getCountries() {
      try {
        dispatch({ type: "loading" });

        const res = await fetch(`${BASE_URL}/name/${name}?fullText=true`);
        const data = await res.json();

        console.log(data[0]);

        dispatch({ type: "countryFetched", payload: data[0] });
      } catch (err) {
        dispatch({ type: "fetchFailed" });
      }
    }

    getCountries();
  }, [BASE_URL, dispatch, name]);

  return (
    <div className={styles.main}>
      <NavBar />
      <div className={styles.section}>
        <Main>
          <BackButton onClick={() => navigate(-1)} />
          {status === "loading" && <Loader />}

          {country && status === "ready" && (
            <CountryDetails country={country} />
          )}
        </Main>
      </div>
    </div>
  );
}

export default DetailsPage;
