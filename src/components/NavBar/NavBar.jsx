import styles from "./NavBar.module.css";
function NavBar() {
  return (
    <nav className={styles.nav}>
      <h1>Where in the world?</h1>
      <h2>Dark Mode</h2>
    </nav>
  );
}

export default NavBar;
