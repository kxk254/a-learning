"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export const AppHeader = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <button
        onClick={() => {
          console.log("clicked");
          toggleTheme();
        }}
      >
        Theme-{theme}
      </button>
    </>
  );
};
