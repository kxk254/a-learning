import React, { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode; // Button text or content
  size?: "sm" | "md"; // Button size
  variant?: "primary" | "outline"; // Button variant
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Disabled state
}

export const Button = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
}) => {
  const sizeClasses = { sm: styles.smallSize, md: styles.midSize };

  const variantClasses = { primary: styles.primary, outline: styles.outline };

  console.log("className", className);

  return (
    <button
      className={`${styles.button}  ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? styles.disabled : ""} ${className}`}
    >
      {startIcon && <span className={styles.iconStyle}>{startIcon}</span>}
      {children}
      {endIcon && <span className={styles.iconStyle}>{endIcon}</span>}
    </button>
  );
};
