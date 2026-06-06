import React from "react";
import { useTheme } from "@/src/context/ThemeContext";
import { BrightnessIcon, MoonIcon } from "@/src/icons/index";
import styles from "./ThemeToggle.module.css";

export const ThemeToggleBtn = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={styles.themeToggleBtn}>
      {theme === "light" ? (
        <MoonIcon className={styles.moon} />
      ) : (
        <BrightnessIcon className={styles.bright} />
      )}
    </button>
  );
};
