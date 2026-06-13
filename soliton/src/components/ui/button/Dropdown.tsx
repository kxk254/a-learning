"use client";
import type React from "react";
import { useEffect, useRef } from "react";
import styles from "./Button.module.css";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Dropdown = ({
  isOpen,
  onClose,
  children,
  className = "",
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest(".dropdown-toggle")
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  if (!isOpen) return null;
  console.log("isopen", isOpen);

  return (
    <div ref={dropdownRef} className={`${styles.dropdownDiv} ${className}`}>
      {children}
    </div>
  );
};
