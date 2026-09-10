import { FiChevronRight, FiMapPin, FiSearch } from "react-icons/fi";
import styles from "./header.module.css";
import { useEffect, useState } from "react";
import { TiPlus } from "react-icons/ti";

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
            <svg
              className="wishlist-icon"
              width="26"
              height="26"
              viewBox="0 0 1024 1024"
              fill="currentColor"
              fillRule="evenodd"
            >
              <path d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z" />
            </svg>
            <span>Wishlist</span>
          </button>
          <button className={styles.actionBtn}>
            <svg
              className="login-icon"
              id="logic-svg"
              width="32"
              height="32"
              viewBox="6 -4 30 29"
              fill="currentColor"
              fillRule="evenodd"
            >
              <path d="M20 11.0003C24.5494 11.0003 28.25 14.7013 28.25 19.2503L27.333 20.1663H12.667L11.75 19.2503C11.75 14.7013 15.451 11.0003 20 11.0003ZM20 12.8333C16.7733 12.8333 14.0944 15.2281 13.6484 18.3333H26.3516C25.9056 15.2282 23.227 12.8334 20 12.8333ZM20 1.83331C22.2742 1.83331 24.125 3.68361 24.125 5.95831C24.125 8.23302 22.2743 10.0833 20 10.0833C17.7257 10.0833 15.875 8.23302 15.875 5.95831C15.875 3.68361 17.7258 1.83331 20 1.83331ZM20 3.66632C18.7364 3.66632 17.708 4.69471 17.708 5.95831C17.708 7.22194 18.7364 8.25031 20 8.25031C21.2636 8.25031 22.292 7.22194 22.292 5.95831C22.292 4.69471 21.2636 3.66632 20 3.66632Z" />
            </svg>
            <span>Login</span>
          </button>
        </div>

        <button className={styles.sellBtn}>
          <TiPlus className={styles.sellPlus} />
          <span className={styles.sellText}>SELL</span>
        </button>
      </div>
    </header>
  );
}
