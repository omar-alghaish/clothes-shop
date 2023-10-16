import { useAuth } from "../context/AuthContext";

export const changeLanguageFunction = (i18n) => {
  if (i18n.language == "en") {
    i18n.changeLanguage("ar");
  } else if (i18n.language == "ar") {
    i18n.changeLanguage("en");
  }

  // const container = document.querySelector(".App");
  // if (i18n.language == "ar") {
  //   container.style.direction = "rtl";
  // } else {
  //   container.style.direction = "ltr";
  // }
};

export const toggleFunction = ({ active, setActive, arr }) => {
  arr.map((element) => {
    var elemnt = document.querySelector(element);
    elemnt.classList.toggle("active");
    active ? setActive(false) : setActive(true);
  });
};

export const IsAdmin = () => {
  const { currentUser } = useAuth();
  const isAdmin = 
    (currentUser && currentUser?.email === process.env.REACT_APP_ADMIN1) ||
    (currentUser && currentUser?.email === process.env.REACT_APP_ADMIN2);
  return isAdmin;
};
