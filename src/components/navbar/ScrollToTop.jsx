// src/components/ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top whenever path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // No UI needed
};

export default ScrollToTop;
