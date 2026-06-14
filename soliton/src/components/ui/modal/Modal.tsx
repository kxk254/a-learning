"use client";
import React, { useRef, useEffect } from "react";
import styles from "./Modal.module.css";
import { CloseLineIcon } from "@/src/icons/index";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  isFullscreen?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true,
  isFullscrren = false,
}: ModalPropos) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (isOpen) return null;

  const contentClasses = isFullscreen ? styles.fullScreen : styles.noFullScreen;

  return (
    <div className={styles.modalDiv1}>
      {isFullscreen && (
        <div onClick={onClose} className={styles.modalDiv2}></div>
      )}
      <div
        ref={modalRef}
        className={`${contentClasses} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button onClick={onClose} className={styles.modalBtn}>
            <CloseLineIcon className={styles.modalIcon} />
          </button>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};
