import styles from "./footer.module.css";

function Footer() {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <p className={styles.footerText}>CM • 2026</p>
      </div>
    </footer>
  );
}

export default Footer;
