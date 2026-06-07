"use client";
import React, { useState } from "react";
import styles from "./Form.module.css";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string[]) => void;
  className?: string;
  defaultValue?: string;
}

export const Select = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
}) => {
  console.log("option ---", options[0]);
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <select
      className={`${styles.select} ${selectedValue ? styles.selectedTrue : styles.selectedFalse} ${className}`}
      value={selectedValue}
      onChange={handleChange}
    >
      <option value="" disabled className={styles.optionOne}>
        {placeholder}
      </option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className={styles.optionTwo}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};
