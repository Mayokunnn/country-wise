import { useNavigate } from "react-router-dom";
import styles from "./CountryItem.module.css";
import { motion } from "framer-motion";

function Country({ country, onClick }) {
  const navigate = useNavigate();
  const { flags, capital, region, population, name } = country;
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, scale: 0.9, y: 5 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ opacity: 1, scale: 1.01 }}
      transition={{
        duration: 0.1,
      }}
      viewport={{ once: true }}
      onClick={() => navigate(`details/${name.common.toLowerCase()}`)}
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
