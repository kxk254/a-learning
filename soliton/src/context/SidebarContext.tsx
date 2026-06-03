// define Expansion, Mobile, Hover, Active, openSubmenu, toggleSidebar,
// toggleMobileSidebar, setIsHovered, setActiveItem, toggleSubmenu

"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type SidebarContextType = {
  isExpanded: boolean;
  isMobileOpen: boolean;
  isHovered: boolean;
  activeItem: string | null;
  openSubmenu: string | null;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setIsHovered: (isHovered: boolean) => void;
  setActiveItem: (item: string | null) => void;
  toggleSubmenu: (item: string) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      let inner = window.innerWidth;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const toggleSubmenu = (item: string) => {
    setOpenSubmenu((prev) => (prev === item ? null : item));
  };
  useEffect(() => {
    console.log(
      "--sidebarcontext--change if isMobileOpen current status",
      isMobileOpen,
    );
  }, [isMobileOpen]);
  useEffect(() => {
    console.log(
      "--sidebar context--change if isMobile current status",
      isMobile,
    );
  }, [isMobile]);
  useEffect(() => {
    console.log("--sidebarcontext isHover", isHovered);
  }, [isHovered]);

  return (
    <SidebarContext.Provider
      value={{
        isExpanded: isMobile ? false : isExpanded,
        isMobileOpen,
        isHovered,
        activeItem,
        openSubmenu,
        toggleSidebar,
        toggleMobileSidebar,
        setIsHovered,
        setActiveItem,
        toggleSubmenu,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
