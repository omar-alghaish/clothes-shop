import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

function Favourits(props) {


  const { user } = useUser();
  const [lovedProducts, setLovedProducts] = useState([]);
  useEffect(() => {
    const fetchLovedProducts = async () => {
      if (user && user.lovedArray && user.lovedArray.length > 0) {
        // Query the products collection based on the user's lovedArray
        const productsQuery = query(
          collection(db, "products"),
          where("id", "in", user.lovedArray)
        );

        try {
          const querySnapshot = await getDocs(productsQuery);
          const products = querySnapshot.docs.map((doc) => doc.data());
          setLovedProducts(products);
        } catch (error) {
          console.error("Error fetching loved products:", error);
        }
      }
    };

    fetchLovedProducts();
  }, [user]);



  if (lovedProducts.length === 0) {
    return <div>There is no favourits yet</div>;
  }



  return (
    <div className="favourits-container">

      {lovedProducts.map((product)=>
      (
        <div key={product.productId} className="card">
        <div className="img-container">
          <img src={product.cover} alt="" />
        </div>
        <div className="info">
          <div className="title">{product.name}</div>
          {product?.discount ? (
            <div className="price-section">
              <div className="discount">
                {product.discount && <span>{product.discount}$</span>}
              </div>
              <div className="price">
                <del>{product.price}</del>${" "}
              </div>
            </div>
          ) : (
            <div className="price">{product.price}$ </div>
          )}
        </div>
      </div>
      )
      
     
      )}
      

    </div>
  );
}

export default Favourits;
