import type { ReactNode } from "react";
import styles from "./button.module.css";

type ButtonProps = {
  children: ReactNode;
  variant: "primary" | "secondary" | "toggle" | "tertiary" | "delete";
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
  type?: "button" | "submit" | "reset";
};

function Button({
  children,
  variant,
  onClick,
  isActive,
  className = "",
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${isActive ? styles.active : ""} ${className} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;
