import styles from "./footer.module.css";
import footer from "./assets/footer.svg";

function Footer() {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <div />
        <img
          src={footer}
          className={styles.footer}
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
        />
        <h6>CM • 2026</h6>
      </div>
    </footer>
  );
}

export default Footer;
