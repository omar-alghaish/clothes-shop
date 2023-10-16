import React from "react";
import "../sass/style.css";
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper";
import image from "../imges/i4.jpg";
import image2 from "../imges/i6.jpg";


import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";

function SlideSwiper() {
  const [t] = useTranslation()
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log("change")}
      centeredSlides={true}
      autoplay={{
        delay:3000,
        smooth:true,
        disableOnInteraction: false,
      }}
      loop={true}
      navigation={true}
      className="mywiperS"
    >
      <SwiperSlide>
        <div className="slide-container">
          <img className="swiper-img-background1" src={image} alt="" />
          <div className="text t2">
            <h1 className="h1">{t('slide-swiper-title')}</h1>
            <p className="p1">
            {t("slide-swiper-p-message")}
            </p>
            <div className="buttons">
              <button className="start-shoping">{t('start-shoping')}</button>{" "}
              <button className="start-shoping">{t('start-shoping')}</button>{" "}
            </div>{" "}
          </div>
        </div>
        
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide-container">
          <img className="swiper-img-background1" src={image2} alt="" />
          <div className="text t2">
            <h1 className="h1">{t('slide-swiper-title2')}</h1>
            <p className="p1">
              {t("slide-swiper-p-message")}
            </p>
            <div className="buttons">
              <button className="start-shoping">{t('start-shoping')}</button>{" "}
              <button className="start-shoping">{t('start-shoping')}</button>{" "}
            </div>{" "}
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default SlideSwiper;
