import React from "react";
import styles from "./Form.module.css";

interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

export const Label = ({ htmlFor, children, className }) => {
  return (
    <label htmlFor={htmlFor} className={`${styles.label} ${className}`}>
      {children}
    </label>
  );
};
