import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerCon}>
      <div className={styles.topFooter}>
        <div className={styles.topInner}>
          <div className={styles.phoneSection}>
            <img
              src="/phone-app.webp"
              alt="OLX App"
              className={styles.phoneImage}
            />
          </div>
          <div className={styles.appDescription}>
            <div>
              <h2>TRY THE OLX APP</h2>
              <p>
                Buy, sell and find just about anything using
                <br />
                the app on your mobile.
              </p>
            </div>
          </div>
          <div className={styles.downloadSection}>
            <h3>GET YOUR APP TODAY</h3>
            <div className={styles.storeButtons}>
              <img src="/appstore_2x.webp" alt="Get it on Google Play" />
              <img src="/playstore_2x.webp" alt="Download on App Store" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.middleFooter}>
        <div className={styles.footerColumns}>
          <div className={styles.footerColumn}>
            <h3>POPULAR LOCATIONS</h3>
            <ul>
              <li>Kolkata</li>
              <li>Mumbai</li>
              <li>Chennai</li>
              <li>Pune</li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>TRENDING LOCATIONS</h3>
            <ul>
              <li>Bhubaneshwar</li>
              <li>Hyderabad</li>
              <li>Chandigarh</li>
              <li>Nashik</li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>ABOUT US</h3>
            <ul>
              <li>About OLX India</li>
              <li>Ask VAYA AI</li>
              <li>Tech@OLX</li>
              <li>Careers</li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>OLX</h3>
            <ul>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
              <li>Vulnerability Disclosure Program</li>
            </ul>
          </div>
          <div className={styles.followSection}>
            <h3>FOLLOW US</h3>
            <div className={styles.socialIcons}>
              <img src="/image.svg"/>
              <img src="/image (1).svg"/>
              <img src="/image (2).svg"/>
              <img src="/image (3).svg"/>
              <img src="/image (5).svg"/>
              <img src="/image (6).svg"/>
            </div>
            <div className={styles.bottomStoreButtons}>
              <img src="/playstore_3x.webp" alt="Get it on Google Play" />
              <img src="/appstore_3x.webp" alt="Download on App Store" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomFooter}>
        <div className={styles.bottomFooterSec}>
          <div className={styles.topbfooter}>
            <div className={styles.groupLogo}>
              <img src="/cartrade_tech.svg" alt="" />
            </div>
            <div className={styles.brandLogos}>
              <div className={styles.brandLogo}>
                <span className={styles.olx}>
                  <img src="/olx_2025.svg" alt="" />
                </span>
              </div>
              <div className={styles.brandLogo}>
                <img src="/carwale.svg" alt="" />
              </div>
              <div className={styles.brandLogo}>
                <img src="/bikewale.svg" alt="" />
              </div>
              <div className={styles.brandLogo}>
                <img src="/cartrade.svg" alt="" />
              </div>
              <div className={styles.brandLogo}>
                <img src="/mobility.svg" alt="" />
              </div>
            </div>
          </div>
          <div className={styles.bottombfooter}>
            <div className={styles.bottombfSec}>
              <div>Help - Sitemap</div>
              <div>All rights reserved &copy; 2006-2026 OLX</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
