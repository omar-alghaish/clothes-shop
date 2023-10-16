import React, { useState, useEffect, Suspense } from "react";
import Loadin from "./Loadin";
import { useProducts } from "../context/ProductsContext";
const ShopCard = React.lazy(() => import("./ShopCard"));

function ShopCardContainer() {
  const { products } = useProducts();

  useEffect(() => {}, []);
  return (
    <div className={`shop-card-container`}>
      {products.pageData.map((product) => {
        return (
          <Suspense fallback={<Loadin Height="100%" />}>
            <ShopCard
              key={product.cover}
              statement={product.statement}
              id={product.id}
              cover={product.cover}
              price={product.price}
              name={product.name}
              discount={product.discount}
            />
          </Suspense>
        );
      })}
    </div>
  );
}

export default ShopCardContainer;
