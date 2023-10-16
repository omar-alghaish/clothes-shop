import React from "react";
import { useTranslation } from "react-i18next";
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
function Adventages() {
  const [t] = useTranslation()
  return (
    <div className="adventages-container">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
        spaceBetween={20}
        slidesPerView={"auto"}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
      >
        <SwiperSlide>
          <div className="adventage">
            <i class="fa-solid fa-truck"></i>
            <h3>{t("free-shiping")}</h3>
            <p>{t("free-shiping-description")}</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="adventage">
            <i class="fa-solid fa-dollar-sign"></i>
            <h3>{t("money-back")}</h3>
            <p>{t("money-back-description")}</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="adventage">
            <i class="fa-solid fa-percent"></i>
            <h3>{t("best-price")}</h3>
            <p>{t("best-price-description")}</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="adventage">
            <i class="fa-solid fa-phone"></i>
            <h3>{t("phone-number")}</h3>
            <p>{t("phone-number-description")}</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Adventages;
