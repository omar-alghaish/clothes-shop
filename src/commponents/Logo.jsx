import React from "react";
import logoDark from "../imges/logo-black.png";
import logoWhite from "../imges/logo-white.png";
import { useSelector } from "react-redux";

function Logo() {
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  return (
    <img
      className="image-logo"
      src={ logoWhite }
      alt="Grazia"
    />
  );
}

export default Logo;
