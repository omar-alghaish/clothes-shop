import React, { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Card from "./Card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function CardsContainer(props) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const documentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(documentsData);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData();
  }, []);

  return (

    <div className="cards-container1">
          <h1 className="container-title">{props.title}</h1>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
        spaceBetween={10}
        slidesPerView={'auto'}
        // centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
       
        className="card-container-swiper"
      >
     
          {documents.map((product) => {
          
            return (
                <SwiperSlide>
                      <Card
                  key={product.cover}
                  statement={product.statement}
                  id={product.id}
                  cover={product.cover}
                  price={product.price}
                  name={product.name}
                  discount={product.discount}
                  category={product.category}
                />
               </SwiperSlide>
            );
          })}
      
      </Swiper>
    </div>
  );
}

export default CardsContainer;
