import React, { useEffect, useState, useRef } from "react";

import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
//components
import LandingPage from "./components/LandingPage";

//screens
import DesireToFly from "./screens/DesireToFly";
import NotForYou from "./screens/NotForYou";

import "./App.css";

//icons
import { AiFillShopping } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";

import SidePanel from "./components/SidePanel";
import { useSelector, useDispatch } from "react-redux";
import { setCartIsOpen } from "../src/features/counter/cartSlice.js";
import ViewCart from "./screens/ViewCart";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

toast.configure();


function App() {
  const dispatch = useDispatch();
  const {
    // total,
    // fnfItemsTotal,
    CartIsOpen: sidePanel,
  } = useSelector((state) => state.cart);
  const [navOpened, setNavOpen] = useState(false);  

  const openNavBarRef = useRef();
  const sidePanelRef = useRef();
  const navigate = useNavigate();

  const detailRef = useRef(null);

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const fnfSectionRef = useRef(null);
  const scrollToFnFSection = () => {
    navigate("/", { state: { targetId: "fnfSection" } });
  };

  const scrollToSection = () => {
    if (detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavOutsideClick = (e) => {
    if (!openNavBarRef?.current?.contains(e.target)) {
      setNavOpen(false);
    }
  };

  const handlePanelOutsideClick = (e) => {
    if (!sidePanelRef?.current?.contains(e.target)) {
      dispatch(setCartIsOpen(false));
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    document.addEventListener("mousedown", handleNavOutsideClick);
    document.addEventListener("mousedown", handlePanelOutsideClick);
    document.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleNavOutsideClick);
      document.removeEventListener("mousedown", handlePanelOutsideClick);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("scroll", handleScroll);
    };
  });
  // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      <ScrollToTop />

      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`} >
        {navOpened ? (
          <div ref={openNavBarRef} className="openNavBar">
            <ul className="navElements">
              <Link
                style={{ textDecoration: "none" }}
                className="navBtn"
                to="/"
                onClick={() => setNavOpen(false)}
              >
                <h2>Home</h2>
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                className="navBtn"
                to="/desiretofly"
                onClick={() => setNavOpen(false)}
              >
                <h2>Desire to fly</h2>
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                className="navBtn"
                to="/notforyou"
                onClick={() => setNavOpen(false)}
              >
                <h2>Not for you</h2>
              </Link>
              <h2
                style={{ textDecoration: "none" }}
                className="navBtn fnfBtn"
                onClick={() => {
                  setNavOpen(false);
                  scrollToFnFSection();
                }}
              >
                Friends & Family
              </h2>
            </ul>
          </div>
        ) : (
          <HiMenuAlt4
            size={40}
            className="hiMenu"
            color="white"
            onClick={() => {
              setNavOpen(!navOpened);
            }}
          />
        )}
        {(navOpened && screenSize.width < 430) || (
          <AiFillShopping
            className="shoppingCartIcon"
            size={40}
            color="white"
            onClick={() => {
              dispatch(setCartIsOpen(!sidePanel));
            }}
          />
        )}
      </nav>

      <SidePanel
        sidePanelOpen={sidePanel}
        setSidePanelOpen={dispatch(setCartIsOpen)}
        sidePanelRef={sidePanelRef}
      />

      <Routes>
        <Route
          path="/"
          element={<LandingPage fnfSectionRef={fnfSectionRef} />}
        />
        <Route path="/desiretofly" element={<DesireToFly detailRef={detailRef} scrollToSection={scrollToSection} />} />
        <Route path="/notforyou" element={<NotForYou detailRef={detailRef} scrollToSection={scrollToSection} />} />
        <Route path="/viewcart" element={<ViewCart />} />

      </Routes>
      <Footer />
    </div>
  );
}
export default App;
