"use client";
import { useState, useCallback } from "react";

export const useModal = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const openModal = useCallback(() => setIUsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const toggleModal = useCallbacl(() => setIsOpen((prev) => !prev), []);
  return { isOpen, openModal, closeModal, toggleModal };
};
