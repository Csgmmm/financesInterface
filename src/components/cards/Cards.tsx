import type { ReactNode } from "react";
import styles from "./cards.module.css";

type Card = {
  children: ReactNode;
  variant: "primary" | "secondary";
  className?: string
};

function Cards({ children, variant, className }: Card) {
  return <div className={`${styles.card} ${styles[variant]} ${className}`}>{children}</div>;
}

export default Cards;
