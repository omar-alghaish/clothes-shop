import React from "react";
import img1 from "../imges/i2.jpg";
import logo from "../imges/logo-color.png";
import { Link } from "react-router-dom";
import Deal from "./Deal.jsx";
import { useTranslation } from "react-i18next";
function Section1() {
  const [t] = useTranslation();
  return (
    <div className="section1-home-container">
      <div className="children">
        <img src={img1} alt="" />
        <div className="text">
          <h3>{t("new-release")}</h3>
          <p>{t("men-women-collection")}</p>
          <div className="buttons">
            <button>
              <Link to="/shop">{t("shop")}</Link>
            </button>
            {/* <button>Women Shop</button> */}
          </div>
        </div>
      </div>
      <div className="children">
        <div>
          <img src={logo} alt="" />
        </div>
        <div>
          <span>{t("special-offers")}</span>
          <p> {t("section1-message")}</p>
        </div>
      </div>
      <div className="children">
        {/* <img src={img2} alt="" />
        <div className="text">
          <h3>New Release</h3>
          <p>Men & Women Summer collection</p>
          <div className="buttons">
            <button>
              <Link to="/shop/fresh">fresh</Link>
            </button>
          </div>
        </div> */}
        <Deal />
      </div>
    </div>
  );
}

export default Section1;
