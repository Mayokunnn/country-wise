import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import BackButton from "../../components/BackButton/BackButton";

import Main from "../../components/Main/Main";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./DetailsPage.module.css";
import { useCountries } from "../../contexts/CountriesContext";
import Loader from "../../components/Loader/Loader";
import CountryDetails from "../../components/CountryDetails/CountryDetails";

function DetailsPage() {
  const { getCountry, status } = useCountries();
  const navigate = useNavigate();
  const { name } = useParams();

  useEffect(() => {
    getCountry(name);
  }, [name, getCountry]);

  return (
    <div className={styles.main}>
      <NavBar />
      <div className={styles.section}>
        <Main style={{ height: "50vh" }}>
          {status === "loading" ? (
            <Loader style={{ position: "relative", top: `${50}%` }} />
          ) : (
            <>
              {" "}
              <BackButton onClick={() => navigate("/")} />
              <CountryDetails />
            </>
          )}
        </Main>
      </div>
    </div>
  );
}

export default DetailsPage;
