import type React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

interface DropdownItemProps {
  tag?: "a" | "button";
  href?: string;
  onClick?: () => void;
  onItemClick?: () => void;
  baseClassName?: string;
  className?: string;
  children: React.ReactNode;
}

export const DropdownItem = ({
  tag = "button",
  href,
  onClick,
  onItemClick,
  baseClassName = styles.baseClassName,
  className = "",
  children,
}: DropdownItemProps) => {
  const combinedClasses = `${baseClassName} ${className}`.trim();

  const handleClick = (e: React.MouseEvent) => {
    if (tag === "button") {
      e.preventDefault();
    }
    if (onClick) onClick();
    if (onItemClick) onItemClick();
  };
  if (tag === "a" && href) {
    return (
      <Link href={href} className={combinedClasses} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={combinedClasses}>
      {children}
    </button>
  );
};
