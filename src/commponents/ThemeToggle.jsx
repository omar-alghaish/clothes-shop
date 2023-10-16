import React, {  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/store";
import { useTranslation } from "react-i18next";

const ThemeToggle = () => {
  const [t, i18n] = useTranslation()
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <span onClick={handleToggle}>
      {darkMode ? t('theme-light') : t('theme-dark')}
    </span>
  );
};

export default ThemeToggle;
