import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SlideSwiper from "../commponents/SlideSwiper";
import Adventages from "../commponents/Adventages";
import Section1 from "../commponents/Section1";
import Section2 from "../commponents/Section2";
import Footer from "../commponents/Footer";
import CardsContainer from "../commponents/CardsContainer";
import Video from "../commponents/Video";
import { useTranslation } from "react-i18next";
import Header from "../commponents/Header";
import Deal from "../commponents/Deal";
import ScrollTracker from "../commponents/ScrollTracker";
import WhatsAppButton from "../commponents/WhatsAppButton";

import Instgram from "../commponents/Instgram";
import { IsAdmin } from "../logic/Logic";
function Home() {
  const [t] = useTranslation();
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className={`home-container ${isDarkMode ? "dark" : "light"}`}>
      <SlideSwiper />
      <WhatsAppButton />
      <CardsContainer title={t("summer-collecion")} />

      <Video />
      <Deal />
      {/* <Section1 /> */}
      <Section2 />
      <Adventages />
    </div>
  );
}

export default Home;
