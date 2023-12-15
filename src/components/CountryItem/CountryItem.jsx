import styles from "./CountryItem.module.css";
import { motion } from "framer-motion";

function Country({ country }) {
  const { flags, capital, region, population, name } = country;
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.2,
        type: "spring",
        stiffness: 200,
      }}
      viewport={{ once: true }}
    >
      <div className={styles.flag}>
        <img src={flags.png} alt={name.common}></img>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <h2>{name.common}</h2>
          <div>
            <p>
              Population: <span>{population.toLocaleString()}</span>
            </p>
            <p>
              Region: <span>{region}</span>
            </p>
            <p>
              Capital: <span>{capital}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Country;
