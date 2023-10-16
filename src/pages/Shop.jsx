import React, { useEffect } from "react";
import FilterComponent from "../logic/FilterComponent";
import ShopCardContainer from "../commponents/ShopCardContainer";
import Pagination from "../commponents/Pagination";
import { useProducts } from "../context/ProductsContext";
import { useParams } from "react-router-dom";
import ScrollTracker from "../commponents/ScrollTracker";
import Test from "../commponents/Test";
function Shop() {
  const { products, getFreshProducts } = useProducts();
  const { category } = useParams();

  var dir = ScrollTracker();

  document.onscroll = () => {
    const shopInfo = document.querySelector(".shop-info");
    const header = document.querySelector(".main-header-container");
    if (header) {
      if (dir === "up") {
        header.style.height = "90px";
        header.style.boxShadow = "none";
      } else {
        header.style.height = "0";
        header.style.overflow = "hidden";
      }
    }
    if (dir === "up") {
      if (shopInfo.style) {
        shopInfo.style.top = "90px";
      }
    } else {
      if (shopInfo.style) {
        shopInfo.style.top = "0px";
      }
    }
  };
  const handleFetchPageData = async () => {
    const updatedProducts = await getFreshProducts(category.toUpperCase());
    console.log(updatedProducts);
  };

  const toggle = () => {
    document.querySelector(".side-bar-container").classList.toggle("show");
  };

  useEffect(() => {
    if (category) {
      handleFetchPageData();
    }
  });

  return (
    <>
      <div className="shop-container">
        <div className="shop-info">
          <span className="filter-button" onClick={toggle}>
            Filter <i class="fa-solid fa-caret-down"></i>
          </span>
          <div>
            <p> {products.totalItems} Items</p>
          </div>
        </div>

        <FilterComponent />
        <ShopCardContainer />
        {/* <Test /> */}
      </div>
      <Pagination />
    </>
  );
}

export default Shop;
