import React from "react";
import img from "../imges/i6.jpg";
import { countDown } from "../logic/functions";
import { useTranslation } from "react-i18next";

countDown("Jan 5, 2025 15:37:25");
function Deal() {
  const [t] = useTranslation()
  return (
    <>  

     <div className="deal-container">
            <h1 className="title">DEAL EVERY WEAK</h1>

      <img className="img-background" src={img} alt="" />
      <div className="deal-info">
        <h2 className="h2">{t("deal-title")}</h2>
        <h1 className="deal-title">Oversized denim jacket</h1>
        <div className="price">
          <p>
            <s className="number">$123.00</s>
          </p>
          <p className="number">$30.00</p>
          <p className="off number">$50 {t("deal-off")}</p>
        </div>
        <div className="date-expires">
          <div className="days">
            <h2 className="number" id="days">14</h2>
            <p>{t("deal-days")}</p>
          </div>
          <div className="hours">
            <h2 className="number"  id="hours">14</h2>
            <p>{t("deal-hours")}</p>
          </div>
          <div className="minutes">
            <h2 className="number" id="minutes">14</h2>
            <p>{t("deal-minutes")}</p>
          </div>
          <div className="seconds">
            <h2 className="number" id="seconds">14</h2>
            <p>{t("deal-seconds")}</p>
          </div>
        </div>
        <button> {t("start-shoping")}</button>
      </div>
    </div>
    </>
   
  );
}

export default Deal;
