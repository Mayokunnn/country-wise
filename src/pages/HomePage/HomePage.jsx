import NavBar from "../../components/NavBar/NavBar";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Body from "../../components/Body/Body";

import styles from "./HomePage.module.css";

function HomePage({ countries, status, dispatch, query }) {
  return (
    <div className={styles.section}>
      <NavBar />
      <Main>
        <Header />
        <Body />
      </Main>
    </div>
  );
}

export default HomePage;
