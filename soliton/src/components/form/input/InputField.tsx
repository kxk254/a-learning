"use client";
import React from "react";
import { useState } from "react";
import styles from "./Input.module.css";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
}

export const Input = ({
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
}) => {
  const [isHover, setIsHover] = useState(false);

  let inputClasses = `${styles.inputClasses} ${className}`;

  if (disabled) {
    inputClasses = `${inputClasses} ${styles.disabled}`;
  } else if (error) {
    inputClasses = `${inputClasses} ${styles.error}`;
  } else if (success) {
    inputClasses = `${inputClasses} ${styles.success}`;
  } else {
    inputClasses = `${inputClasses} ${styles.others}`;
  }

  return (
    <div
      className={styles.inputDiv}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={inputClasses}
      />
      {hint && (
        <p
          className={`${styles.p} ${
            error ? styles.pError : success ? styles.pSuccess : styles.pOther
          } ${isHover ? styles.show : styles.hide}`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};
