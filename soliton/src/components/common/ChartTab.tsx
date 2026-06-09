import React, { useState } from "react";
import styles from "./Common.module.css";

export const ChartTab = () => {
  const [selected, setSelected] = useState<
    "optionOne" | "optionTwo" | "optionThree"
  >("optionOne");

  const getButtonClass = (option: "optionOne" | "optionTwo" | "optionThree") =>
    selected === option ? styles.chartOptionTrue : styles.chartOptionFalse;

  return (
    <div className={styles.chartDiv}>
      <button
        onClick={() => setSelected("optionOne")}
        className={`${styles.chartButton} ${getButtonClass("optionOne")}`}
      >
        Monthly
      </button>
      <button
        onClick={() => setSelected("optionTwo")}
        className={`${styles.chartButton} ${getButtonClass("optionTwo")}`}
      >
        Quarterly
      </button>
      <button
        onClick={() => setSelected("optionThree")}
        className={`${styles.chartButton} ${getButtonClass("optionThree")}`}
      >
        Annually
      </button>
    </div>
  );
};
