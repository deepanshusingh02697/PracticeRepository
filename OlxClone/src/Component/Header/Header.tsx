import {
  FiChevronRight,
  FiHeart,
  FiMapPin,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerCon}>
        <div className={styles.logo}>
          <span>olx</span>
          <small>india</small>
        </div>
        <div className={styles.location}>
          <FiMapPin className={styles.locIcon} />
          <span className={styles.locText}>India</span>
          <FiChevronRight className={styles.chevron} />
        </div>
        <div className={styles.searchCon}>
          <input
            type="text"
            placeholder={'Search "Jobs"'}
            className={styles.searchInput}
          />
          <button className={styles.searchBtn}>
            <FiSearch />
          </button>
        </div>
        <button className={styles.actionBtn}>
          <FiHeart className={styles.actionIcon} />
          <span>Wishlist</span>
        </button>
        <button className={styles.actionBtn}>
          <FiUser className={styles.actionIcon} />
          <span>Login</span>
        </button>
        <button className={styles.sellBtn}>
          <span className={styles.sellPlus}>+</span>
          <span className={styles.sellText}>SELL</span>
        </button>
      </div>
    </header>
  );
}
