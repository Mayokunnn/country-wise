import { lazy, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import BackButton from "../../components/BackButton/BackButton";

import Main from "../../components/Main/Main";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./DetailsPage.module.css";
import { useCountries } from "../../contexts/CountriesContext";
import Loader from "../../components/Loader/Loader";

const CountryDetails = lazy(() =>
  import("../../components/CountryDetails/CountryDetails")
);

function DetailsPage() {
  const { getCountry } = useCountries();
  const navigate = useNavigate();
  const { name } = useParams();

  useEffect(() => {
    getCountry(name);
  }, [name, getCountry]);

  return (
    <div className={styles.main}>
      <NavBar />
      <div className={styles.section}>
        <Main>
          <BackButton onClick={() => navigate("/")} />
          <Suspense fallback={<Loader />}>
            <CountryDetails />
          </Suspense>
        </Main>
      </div>
    </div>
  );
}

export default DetailsPage;
