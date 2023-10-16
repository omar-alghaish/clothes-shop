import React, { useState, useRef } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  changeLanguageFunction,
  toggleFunction,
  IsAdmin,
} from "../logic/Logic";
import ScrollTracker from "./ScrollTracker";
import Bag from "./Bag";

function Header() {
  const [t, i18n] = useTranslation();
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  const [active, setActive] = useState(true);
  var dir = ScrollTracker();
  document.onscroll = () => {
    const header = document.querySelector(".main-header-container");
    if (dir === "up") {
      header.style.height = "90px";
    } else {
      header.style.height = "0";
      header.style.overflow = "hidden"
    }
  };
  const toggle = () => {
    toggleFunction({
      active,
      setActive,
      arr: [".toggle-button", ".header-container", ".main-header-container"],
    });
  };

  const toggle2 = () => {
    const links = document.querySelector(".links");
    links.classList.toggle("active");
  };
  return (
    <div className="main-header-container">
      <div className="test">{t("shiping")}</div>
      <div className="logo">
      <div className="logo-container">
          <Logo />
        </div>
       
        <div className="links">
          <Link to="/profile">
            <i class="fi fi-rr-circle-user"></i>
          </Link>

          <Link>
            <i class="fa-regular fa-heart" />
          </Link>
          <Link>
          <i onClick={toggle2} class="fi fi-rr-shopping-bag"></i>          </Link>
          <div className="bag-container">
          <i onClick={toggle2} class="fa-solid fa-xmark"></i>
            <h1>Shoping Cart</h1>
            <Bag />
          </div>
          
        </div>
        <div onClick={toggle} className="toggle-button">
          {active ? (
            <i class="fa-solid fa-bars"></i>
          ) : (
            <i class="fa-solid fa-xmark"></i>
          )}
        </div>
      </div>

      <div
        className="header-container"
        data-theme={`${isDarkMode ? "dark" : "light"}`}
      >
        <div
          data-theme={`${isDarkMode ? "dark" : "light"}`}
          className="main-div"
        >
          <ul className="main-ul">
            <li onClick={toggle} className="main-li">
              <Link to="/">{t("home")}</Link>
            </li>
            <li onClick={toggle} className="main-li">
              <Link to="/shop">{t("shop")}</Link>
            </li>
            <li onClick={toggle} className="main-li">
              <a href="#">{t("collection")}</a>
            </li>
            <li className="main-li">
              <a href="#">
                {t("gender")}
                <ul>
                  <li onClick={toggle}>Men</li>
                  <li onClick={toggle}>womens</li>
                </ul>
              </a>
            </li>
          </ul>
        </div>
        <div className="logo-container">
          <Logo />
        </div>
        <div className="main-div">
          <ul className="main-ul">
            <li onClick={toggle} className="main-li">
              <a href="#">{t("about")}</a>
            </li>
            <li onClick={toggle} className="main-li">
              <Link to="/profile">{t("profile")}</Link>
            </li>
            <li
              onClick={() => changeLanguageFunction(i18n)}
              className="main-li"
            >
              {i18n.language == "en" ? t("lang-ar") : t("lang-en")}
            </li>
            <li onClick={toggle} className="main-li">
              <ThemeToggle />
            </li>
            {IsAdmin() ? (
              <li className="main-li" onClick={toggle}>
                <Link to="/admin">{t("admin")}</Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
