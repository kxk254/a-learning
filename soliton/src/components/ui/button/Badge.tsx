import React from "react";
import styles from "./Button.module.css";

type BadgeVariant = "light" | "solid";
type BadgeSize = "sm" | "md";
type BadgeColor = "primary" | "success" | "error" | "warning";
interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  color?: BadgeColor;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Badge = ({
  variant = "light",
  color = "primary",
  size = "md",
  startIcon,
  endIcon,
  children,
}: BadgeProps) => {
  const baseStyles = styles.baseStyles;
  const sizeStyles = { sm: styles.sizeSm, md: styles.sizeMd };
  const variants = {
    light: {
      primary: styles.badgePrimary,
      success: styles.badgeSuccess,
      error: styles.badgeError,
      warning: styles.badgeWarning,
    },
    solid: {
      primary: styles.badgePrimaryS,
      success: styles.badgeSuccessS,
      error: styles.badgeErrorS,
      warning: styles.badgeWarningS,
    },
  };

  const sizeClass = sizeStyles[size];
  const colorStyles = variants[variant][color];

  return (
    <span className={`${baseStyles} ${sizeClass} ${colorStyles}`}>
      {startIcon && <span className={styles.mr1}>{startIcon}</span>}
      {children}
      {endIcon && <span className={styles.ml1}>{endIcon}</span>}
    </span>
  );
};
