import {
  FiChevronRight,
  FiHeart,
  FiMapPin,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import styles from "./header.module.css";
import { useEffect, useState } from "react";

export default function Header() {
  const [val, setVal] = useState("Cars");
  const data = ["Cars", "Jobs", "Mobiles", "Bikes", "Properties"];

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setVal(data[idx]);
      idx = (idx + 1) % data.length;
    }, 1300);
    return () => clearInterval(interval);
  }, []);
  return (
    <header className={styles.header}>
      <div className={styles.headerCon}>
        <div className={styles.logo}>
          <img src="/olx_logo_2025.svg" alt="" width="50" height="50" />
        </div>
        <div className={styles.location}>
          <FiMapPin className={styles.locIcon} />
          <span className={styles.locText}>India</span>
          <FiChevronRight className={styles.chevron} />
        </div>
        <div className={styles.searchCon}>
          <div className={styles.searchPlaceholder}>
            <span>Search </span>
            <span key={val} className={styles.searchChanging}>
              "{val}"
            </span>
          </div>
          <input type="text" className={styles.searchInput} />
          <button className={styles.searchBtn}>
            <FiSearch />
          </button>
        </div>
        <div className={styles.actionbtns}>
          <button className={styles.actionBtn}>
            <FiHeart className={styles.actionIcon} />
            <span>Wishlist</span>
          </button>
          <button className={styles.actionBtn}>
            <FiUser className={styles.actionIcon} />
            <span>Login</span>
          </button>
        </div>

        <button className={styles.sellBtn}>
          <span className={styles.sellPlus}>+</span>
          <span className={styles.sellText}>SELL</span>
        </button>
      </div>
    </header>
  );
}
