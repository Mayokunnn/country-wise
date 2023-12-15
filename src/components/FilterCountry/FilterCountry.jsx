import styles from "./FilterCountry.module.css";

// const options = [
//   { value: "nigeria", label: "Nigeria" },
//   { value: "germany", label: "Germany" },
//   { value: "usa", label: "USA" },
//   { value: "australia", label: "Australia" },
// ];

function FilterCountry() {
  return (
    <div className={styles.select}>
      <select>
        <option value="">Select an option</option>
        <option>Nigeria</option>

        <option>Germany</option>
        <option>USA</option>
        <option>Australia</option>
      </select>
    </div>
  );
}

export default FilterCountry;
