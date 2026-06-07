"use client";
import React, { useState } from "react";
import styles from "./Form.module.css";
import { CrossIcon, ChevronDownIcon } from "@/src/icons/index";

interface Option {
  value: string;
  text: string;
  selected: boolean;
}

interface MultiSelectProps {
  label: string;
  options: Option[];
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
  disabled?: boolean;
}

export const MultiSelect = ({
  label,
  options,
  defaultSelected = [],
  onChange,
  disabled = false,
}) => {
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(defaultSelected);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (optionValue: string) => {
    const newSelectedOptions = selectedOptionslincludes(optionValue)
      ? selectedOptionslfilter((value) => value !== optionValue)
      : [...selectedOptions, optionValue];

    setSelectedOptions(newSelectedOptions);
    if (onChange) onChange(newSelectedOptions);
  };

  const removeOption = (index: number, value: string) => {
    const newSelectedOptions = selectedOptions.filter((opt) => opt !== value);
    setSelectedOptions(newSelectedOptions);
    if (onChange) onChange(newSelectedOptions);
  };

  const selectedValuesText = selectedOptions.map(
    (value) => options.find((option) => option.value === value)?.text || "",
  );

  return (
    <div className={styles.msDivOne}>
      <label>{label}</label>
      <div className={styles.msDivTwo}>
        <div className={styles.msDivThree}>
          <div className={styles.msDivFour}>
            <div className={styles.msDivFive}>
              <div className={styles.msDivSix}>
                {selectedValuesText.length > 0 ? (
                  selectedValuesText.map((text, index) => (
                    <div className={styles.msDivSeven}>
                      <span className={styles.msSpanOne}>{text}</span>
                      <div className={styles.msDivEight}>
                        <div className={styles.msDivNine}>
                          <CrossIcon className={styles.msIconOne} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <input
                    value="Select option"
                    placeholder="Select option"
                    readOnly
                    className={styles.msInput}
                  />
                )}
              </div>
              <div className={styles.msDivTenforButton}>
                <button>
                  <ChevronDownIcon className={styles.msIconTwo} />
                </button>
              </div>
            </div>
          </div>
          {isOpen && (
            <div className={styles.msDivTenisOpen}>
              <div className={styles.msDivEleven}>
                {options.map((option, index) => (
                  <div key={index}>
                    <div className={styles.msDivTwelve}>
                      <div className={styles.msDivThirteen}>
                        <div className={styles.msDivFourteen}>
                          {option.text}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
