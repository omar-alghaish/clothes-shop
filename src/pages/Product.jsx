import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Helmet from "react-helmet";
import { useUser } from "../context/UserContext";
import { addToBag } from "../logic/Bag";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs, Autoplay, A11y } from "swiper";
import Loadin from "../commponents/Loadin";
import { useTranslation } from "react-i18next";
import { useProducts } from "../context/ProductsContext";
import {useBag} from "../context/BagContext"

function Product() {
  const { id } = useParams();
  const [t] = useTranslation();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isInBag, setIsInBag] = useState(false);
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState();
  const { user } = useUser();
  const { setBagItems } = useBag();

  const { product, fetchProduct, fetchAllProducts } = useProducts();

  const handleBagButton = async () => {
    addToBag({ id, user, quantity, size });
    setBagItems((prevBagItems) => [...prevBagItems, { id, quantity, size }]);
    const links = document.querySelector(".links");
    links.classList.toggle("active");
  };

  useEffect(() => {
    if (user) {
      setIsInBag(user.bagArray?.includes(id) ?? false);
    }
  }, [user]);

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  if (!product) {
    return <Loadin Height="100vh" />;
  }

  return (
    <>
      <div className="product-container">
        <Helmet>
          <title>{product?.name}</title>
          <meta name="title" content={product?.name} />
          <meta name="description" content={product?.discription} />
          <meta name="image" content={product?.cover} />
          <meta name="type" content={product?.category} />

          <meta
            name="keywords"
            content={`${product?.category},jeans,fashion,grazia,shirt,`}
          />
          <meta name="og:title" content={`${product?.name}`} />
          <meta name="og:type" content={`${product?.category}`} />
          <meta name="og:image" content={`${product?.cover}`} />
          <meta name="og:description" content={`${product?.discription}`} />
        </Helmet>

        <div className="product-swiper">
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay, A11y]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="mySwiper2"
          >
            {product?.imagesArray.map((img) => {
              return (
                <SwiperSlide>
                  <div className="image-container">
                    <img src={img} alt="" />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={5}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {product?.imagesArray.map((img) => {
              return (
                <SwiperSlide>
                  <img src={img} alt="" />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="details">
            <div className="description">
              <h4>{t("description")}</h4>
              <p>{product?.discription}</p>
            </div>
          </div>
          {/* {product?.imagesArray.map((img) => {
            return (
              <div>
                <img src={img} alt="" />
              </div>
            );
          })} */}
        </div>
        <div className="product-info">
          <div className="category">{product.category}</div>
          <h1 className="title">{product.name}</h1>
          {product?.discount ? (
            <div className="price">
              <div className="price">{product.price}$ </div>{" "}
              <div className="discount">
                {product.discount && <del>{product.discount}$</del>}
              </div>
            </div>
          ) : (
            <div className="price">{product.price}$ </div>
          )}
          <div className="bottom">
            <div className="color">
              <p>Color {product.color}</p>
              <div className="color-options">
                <div className="black"></div>
                <div className="red"></div>
                <div className="blue"></div>
              </div>
              <div className="size">
                <p>Size</p>
                <div className="size-options">
                  <button onClick={() => setSize("M")}>M</button>
                  <button onClick={() => setSize("L")}>L</button>
                  <button onClick={() => setSize("XL")}>XL</button>
                  <button onClick={() => setSize("XXL")}>XL</button>
                </div>
              </div>
              <div className="add-to-bag">
                <select
                  name=""
                  id=""
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  value={quantity}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <button onClick={handleBagButton}>{t("add-bag")}</button>
              </div>
              <p className="free-shiping">{t("shiping")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
