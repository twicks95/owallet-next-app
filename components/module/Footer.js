import styles from "../../styles/Footer.module.css";

export default function Footer() {
  return (
    <div
      className={`d-flex flex-column-reverse flex-md-row align-items-start align-items-md-center justify-content-center justify-content-md-between py-5 py-md-0 ${styles.footerContainer}`}
    >
      <small>
        {(() => {
          const date = new Date();
          return date.getFullYear();
        })()}{" "}
        {process.env.APP_NAME}. All right reserved.
      </small>
      <div className="d-flex flex-column flex-md-row mb-3 mb-md-0">
        <span className={`${styles.phone$}`}>+62 5637 8882 9901</span>
        <span className={`${styles.email$}`}>contact@owallet.com</span>
      </div>
    </div>
  );
}
