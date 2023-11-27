import styles from "./App.module.css";
import { useLocation } from "react-router-dom";

const Computers = () => (
  <a href={"/"}>
    <div>Computers</div>
  </a>
);

const Pool = () => <div>Pool</div>;

export default () => {
  return (
    <div className={styles.tabs}>
      {useLocation().pathname === "/pool" ? <Computers /> : <Pool />}
    </div>
  );
};
