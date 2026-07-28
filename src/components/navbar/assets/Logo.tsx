import logoDarkMode from "./logoDarkMode.svg";
import logoLightMode from "./logoLightMode.svg";
import styles from "./logo.module.css";

type LogoProps = {
  currentTheme: string;
};

function Logo({ currentTheme }: LogoProps) {
  return (
    <img
      onDragStart={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
      className={styles.logo}
      src={currentTheme === "dark" ? logoDarkMode : logoLightMode}
      alt="Logo"
    />
  );
}

export default Logo;
