import styles from "./filter.module.css";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Filters() {
  return (
    <>
      <div className={styles.filterCon}>
        <div className={`${styles.filterBtn} ${styles.allfilter}`}>
          <GiHamburgerMenu />
          <span>ALL CATEGORIES</span>
        </div>
        <div className={styles.filterSec}>
          <div className={styles.filterBtn}>Cars</div>
          <div className={styles.filterBtn}>Mortorcycles</div>
          <div className={styles.filterBtn}>Mobile Phones</div>
          <div className={styles.filterBtn}>For Sale: Houses & Apartments</div>
          <div className={styles.filterBtn}>For Rent: Houses & Apartments</div>
          <div className={styles.filterBtn}>Beds-Wardrobes</div>
          <div className={styles.filterBtn}>TVs, Video-Audio</div>
          <span className={styles.bar}>|</span>
          <span className={styles.date}>
            {new Date().toLocaleDateString("In-en", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </>
  );
}
