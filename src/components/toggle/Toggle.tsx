import styles from "./toggle.module.css";
import { Moon, Sun } from "lucide-react";

interface IToggleProps {
  theme: string;
  toggleTheme: () => void; //altera o estado, muda o HTML, mas não faz um return de valor (nr, string, etc...)
}

function Toggle({ theme, toggleTheme }: IToggleProps) {
  const isLight = theme === "light"; //Visualização. Converte o estado atual numa classe. isLight: Olha para o estado atual (theme). Pergunta: "O tema ATUAL é light?". E guarda esse resultado e aplica na classe.

  return (
    <button
      className={`${styles.themeToggle} ${isLight ? styles.light : styles.dark}`} //para nao reescrever: ${theme === "dark" ? "dark" : "light"}`. Ou seja, guarda o que já foi escrito anteriormente
      onClick={toggleTheme}
    >
      <span className={styles.iconSun}>
        <Sun size={20} />
      </span>

      <span className={styles.iconMoon}>
        <Moon size={20} />
      </span>

      <div className={styles.toggleBall} />
    </button>
  );
}

export default Toggle;

//conclusão: Sem o toggleTheme, o clique não faz nada. Sem o isLight/className, a mudança de tema acontece "às cegas" e o botão não reage.
