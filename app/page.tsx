"use client";
import "./styles.css";
import { useState } from "react";
import { useReducer } from "react";
import { useRef, createContext, useContext, memo, useCallback } from "react";

import ProductPage from "./ProductPage.js";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={(e) => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <ProductPage
        referredId="hello-world#"
        productId={123}
        theme={isDark ? "dark" : "light"}
      />
    </div>
  );
}
