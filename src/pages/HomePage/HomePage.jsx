import NavBar from "../../components/NavBar/NavBar";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Body from "../../components/Body/Body";

import styles from "./HomePage.module.css";
import { useCountries } from "../../contexts/CountriesContext";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";

function HomePage() {
  const { status, query } = useCountries();

  if (!query && status === "error")
    return (
      <Message>
        We had a little problem fetching the countries😫. Try reloading.
      </Message>
    );

  return (
    <div className={styles.section}>
      <NavBar />
      <Main>
        {status === "loading" ? (
          <Loader />
        ) : (
          <>
            {" "}
            <Header />
            <Body />
          </>
        )}
      </Main>
    </div>
  );
}

export default HomePage;
