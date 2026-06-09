"use client";
import { useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Label } from "./Label";
import { CalendarIcon } from "@/src/icons/index";
import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;
import styles from "./Form.module.css";

type PropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: Hook | Hook[];
  defaultDate?: DateOption;
  label?: string;
  placeholder?: string;
};

export function DatePicker({
  id,
  mode,
  onChange,
  label,
  defaultDate,
  placeholder,
}: PropsType) {
  useEffect(() => {
    const flatPickr = flatpickr(`#${id}`, {
      mode: mode || "single",
      static: true,
      monthSelectorType: "static",
      dateFormat: "Y-m-d",
      defaultDate,
      onChange,
    });
    return () => {
      if (!Array.isArray(flatPickr)) {
        flatPickr.destroy();
      }
    };
  }, [mode, onChange, id, defaultDate]);

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className={styles.dateDiv}>
        <input id={id} placeholder={placeholder} className={styles.dateInput} />
        <span className={styles.dateSpan}>
          <CalendarIcon className={styles.dateIcon} />
        </span>
      </div>
    </div>
  );
}
