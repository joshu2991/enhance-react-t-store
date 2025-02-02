import { useLocation } from "react-router-dom";
import { useEffect } from "react";

/*
    Import <ScrollToTop/> on any Component,
    so when that component loads, it ensures scroll to top of page
*/
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Optional if you want to skip the scrolling animation
    });
  }, [pathname]);

  return null;
}