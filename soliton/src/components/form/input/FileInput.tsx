import React from "react";
import styles from "./Input.module.css";

interface FileInputProps {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileInput = ({ className = "", onChange }: FileInputProps) => {
  return (
    <input
      type="file"
      className={`${styles.fileInput} ${className}`}
      onChange={onChange}
    />
  );
};
