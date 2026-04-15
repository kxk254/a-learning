"use client";
import "./styles.css";
import { useState } from "react";
import { useReducer } from "react";
import { useRef, createContext, useContext, memo, useCallback } from "react";

import ProductPage from "./ProductPage.js";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <>
      <p>
        <input
          type="checkbox"
          checked={isDark}
          onChange={(e) => setIsDark(e.target.checked)}
        />
      </p>
      <ProductPage
        referredId="wizard_of_oz"
        productId={123}
        theme={isDark ? "dark" : "light"}
      />
    </>
  );
}
