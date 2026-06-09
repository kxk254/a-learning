import React, { useState } from "react";
import styles from "./Input.module.css";

interface TextareaProps {
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  hing?: string;
}

export const TextArea = ({
  placeholder,
  rows = 3,
  value = "",
  onChange,
  className = "",
  disabled = false,
  error = false,
  hint = "",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };
  let textareaClasses = `${styles.textareaClasses} ${className}`;
  if (disabled) {
    textareaClasses = `${textareaClasses} ${styles.disabled}`;
  } else if (error) {
    textareaClasses = `${textareaClasses} ${styles.error}`;
  } else {
    textareaClasses = `${textareaClasses} ${styles.other}`;
  }

  return (
    <div className={styles.relative}>
      <textarea
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={textareaClasses}
      />
      {hint && (
        <p className={`${styles.hint} ${error ? styles.hintError : ""}`}>
          {hint}
        </p>
      )}
    </div>
  );
};
