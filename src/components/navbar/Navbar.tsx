import styles from "./navbar.module.css";
import Logo from "./assets/Logo";
import Toggle from "../toggle/Toggle";
import { useEffect, useState } from "react";
import { auth, loginWithGoogle, logout } from "../../firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import Button from "../button/Button";
import google from "./assets/google.png";
import { LogOut } from "lucide-react";

interface NavbarProps {
  theme: string;
  onToggleTheme: () => void;
}

function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // No firebase.ts, exportamos o auth, que é a ligação/canal com o projeto no Firebase.

    // A variavel unsubscribe guarda a função de cancelamento devolvida automaticamente para "desligar" o vigia e poupar memória.

    //  Quando executamos onAuthStateChanged(auth, callback), usamos essa ligação para ativar o onAuthStateChanged que funciona como um vigia atento a alterações na sessão.
    //(currentUser) => { ... } é o callback.
    // "Auth" é o primeiro argumento passado para a função, que indica ao vigia qual canal/projeto configurado no firebase.ts monitorizar.
    // o currentUser é o que mudou/novo dado (seguindo o exemplo é newDimension), portanto o que mudar, é guardado aqui.  E o setUser(currentUser); ele atualiza o UI de acordo com o curretUser (este contém os dados novos).
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className={styles.navContainer}>
      <div className={styles.navItem} />
      <Logo  currentTheme={theme} />
      <div className={styles.themeGoogle}>
        <Toggle theme={theme} toggleTheme={onToggleTheme} />
        {user ? (
          <div className={styles.userContainer}>
            <span className={styles.user}>Hi, {user.displayName}</span>
            <Button variant="tertiary" onClick={logout}>
              <LogOut size={22} />
            </Button>
          </div>
        ) : (
          <Button variant="secondary" onClick={loginWithGoogle}>
            <img src={google} className={styles.googleIcon} />
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
