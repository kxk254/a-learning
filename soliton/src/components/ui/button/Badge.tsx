import React from "react";
import styles from "./Button.module.css";

type BadgeVariant = "light" | "solid";
type BadgeSize = "sm" | "md";
type BadgeColor = "primary" | "success" | "error" | "warning";
interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  color?: BadgeColor;
  startIcon?: ElementType;
  endIcon?: ElementType;
  children: React.ReactNode;
}

export const Badge = ({
  variant = "light",
  color = "primary",
  size = "md",
  startIcon: StartIcon,
  endIcon: EndIcon,
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
      {StartIcon && (
        <span className={styles.mr1}>
          <StartIcon className={styles.startIcon} />
        </span>
      )}
      {children}
      {EndIcon && (
        <span className={styles.ml1}>
          <EndIcon className={styles.endIcon} />
        </span>
      )}
    </span>
  );
};
