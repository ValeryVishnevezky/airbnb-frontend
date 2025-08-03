import { Link, NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { logout } from "../store/actions/user.actions.js";
import { StayFilterFocused } from "./StayFilterFocused.jsx";
import { StayFilterUnfocused } from "./StayFilterUnfocused.jsx";
import { throttle } from 'lodash';

export function AppHeaderFull() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/stay";
  const isReservationPage = location.pathname.startsWith("/reservation/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFilterFocused, setIsFilterFocused] = useState(true);
  const [modalType, setModalType] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1127);

  // Ref for hamburger dropdown
  const menuRef = useRef(null);

  useEffect(() => {
	const throttledScroll = throttle(() => {
		const scrolled = window.scrollY > 0;
		setIsScrolled(scrolled);
		if (scrolled) {
		  setIsFilterFocused(false);
		} else if (!scrolled && isHomePage) {
		  setIsFilterFocused(true);
		}
	  }, 100); // не чаще одного раза в 100мс
	
	  window.addEventListener("scroll", throttledScroll);
	  window.addEventListener("resize", handleResize);
	  document.addEventListener("mousedown", handleClickOutside);
	
	  return () => {
		window.removeEventListener("scroll", throttledScroll);
		window.removeEventListener("resize", handleResize);
		document.removeEventListener("mousedown", handleClickOutside);
	  };
  }, [isHomePage]);

  function handleScroll() {
    setIsScrolled(window.scrollY > 0);
    if (window.scrollY > 0) {
      setIsFilterFocused(false);
    } else if (window.scrollY === 0 && isHomePage) {
      setIsFilterFocused(true);
    }
  }

  function handleResize() {
    if (window.innerWidth <= 1127) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  }

  function toggleFilterFocus() {
    setIsFilterFocused(true);
  }

  function onOpenFilterFocus(modalType) {
    setModalType(modalType);
    setIsFilterFocused(true);
  }

  async function onLogout() {
    try {
      await logout();
      navigate("/login");
      showSuccessMsg(`Bye now`);
    } catch (err) {
      showErrorMsg("Cannot logout");
    }
  }

  function onOpenCloseMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleClickOutside(event) {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false); 
    }
  }

  return !isReservationPage ? (
    <header
      className={`app-header ${
        isHomePage ? (isScrolled || !isFilterFocused ? "sticky" : "") : "small"
      }`}
    >
      {(isScrolled && isFilterFocused) || (!isHomePage && isFilterFocused) ? (
        <div className="overlay" onClick={() => setIsFilterFocused(false)}></div>
      ) : null}
      <div className="app-header-top">
        <Link to="/stay" className="logo">
          <div className="app-header-left-box">
            {isSmallScreen ? (
              <img
                className="app-header-left-box-logo-img"
                src="/svg/small-logo.svg"
                alt="App Logo"
              />
            ) : (
              <img
                className="app-header-left-box-logo-img"
                src="/svg/logo.svg"
                alt="App Logo"
              />
            )}
          </div>
        </Link>

        <div className="app-header-right-box" ref={menuRef}>
          <Link to="/stay/edit" className="edit">
            <p>Airbnb your home</p>
          </Link>
          <img
            className="app-header-world-svg"
            src="/svg/world.svg"
            alt="World icon"
          />
          <button
            className={`app-header-right-box-menu ${
              isMenuOpen ? "active-menu" : ""
            }`}
            onClick={onOpenCloseMenu}
          >
            <img
              className="app-header-menu-svg"
              src="/svg/menu.svg"
              alt="Menu icon"
            />
            {user ? (
              <img
                className="app-header-user-img"
                src={user.imgUrl ? user.imgUrl : "/img/effie.jpeg"}
                alt="User icon"
              />
            ) : (
              <img
                className="app-header-user-img"
                src="/img/user.png"
                alt="User icon"
              />
            )}
          </button>
          {isMenuOpen && (
            <div className="dropdown-menu">
              {user ? (
                <>
                  <NavLink
                    className="dropdown-menu-link messages"
                    to="/dashboard/listings"
                    onClick={onOpenCloseMenu}
                  >
                    Messages
                  </NavLink>
                  <NavLink
                    className="dropdown-menu-link trips"
                    to="trips"
                    onClick={onOpenCloseMenu}
                  >
                    Trips
                  </NavLink>
                  <NavLink
                    className="dropdown-menu-link edit"
                    to="stay/edit"
                    onClick={onOpenCloseMenu}
                  >
                    Add new stay
                  </NavLink>
                  <NavLink
                    className="dropdown-menu-link wishlist"
                    to="/dashboard/listings"
                    onClick={onOpenCloseMenu}
                  >
                    Wishlist
                  </NavLink>
                  <hr />
                  <NavLink
                    className="dropdown-menu-link"
                    to="/dashboard/reservations"
                    onClick={onOpenCloseMenu}
                  >
                    Dashboard
                  </NavLink>
                  <hr />
                  <NavLink
                    className="dropdown-menu-link"
                    to="about"
                    onClick={onOpenCloseMenu}
                  >
                    About us
                  </NavLink>
                  <button
                    className="dropdown-menu-link-btn"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    className="dropdown-menu-link login"
                    to="login"
                    onClick={onOpenCloseMenu}
                  >
                    Log in
                  </NavLink>
                  <NavLink
                    className="dropdown-menu-link"
                    to="login/signup"
                    onClick={onOpenCloseMenu}
                  >
                    Sign up
                  </NavLink>
                  <hr />
                  <NavLink
                    className="dropdown-menu-link"
                    to="about"
                    onClick={onOpenCloseMenu}
                  >
                    About us
                  </NavLink>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <StayFilterFocused
        modalType={modalType}
        isFilterFocused={isFilterFocused}
      />
      <StayFilterUnfocused
        toggleFilterFocus={toggleFilterFocus}
        onOpenFilterFocus={onOpenFilterFocus}
        isFilterFocused={isFilterFocused}
      />
    </header>
  ) : (
    <header className="app-header full">
      <div className="app-header-top-reservation">
        <Link to="/stay" className="logo">
          <div className="app-header-left-box">
            <img
              className="app-header-left-box-logo-img"
              src="/svg/logo.svg"
              alt="App Logo"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
