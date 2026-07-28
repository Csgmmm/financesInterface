import styles from "./navbar.module.css";
import Logo from "./assets/Logo";
import Toggle from "../toggle/Toggle";

interface NavbarProps {
  theme: string;
  onToggleTheme: () => void;
}

function Navbar({ theme, onToggleTheme }: NavbarProps) {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.navItem} />
      <Logo currentTheme={theme} />

      <Toggle theme={theme} toggleTheme={onToggleTheme} />
    </nav>
  );
}

export default Navbar;