import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import BackButton from "../../components/BackButton/BackButton";
import CountryDetails from "../../components/CountryDetails/CountryDetails";
import Main from "../../components/Main/Main";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./DetailsPage.module.css";
import { useCountries } from "../../contexts/CountriesContext";

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

          <CountryDetails />
        </Main>
      </div>
    </div>
  );
}

export default DetailsPage;
