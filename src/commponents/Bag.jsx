import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import {
  FieldValue,
  Timestamp,
  addDoc,
  collection,
  deleteField,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useBag } from "../context/BagContext";
function Bag() {
  const { user } = useUser();
  const { bagItems } = useBag();

  const [bagArray, setBagArray] = useState([]);

  const addToOrders = async () => {
    const ordersRef = collection(db, "orders");
  
    try {
      await addDoc(ordersRef, {
        client: user.email,
        number: user.phone,
        id: user.id,
        order: user?.bagArray,
        date: Timestamp.now()
      });
  
      // After adding the order, delete the "bagArray" field for the user document
      const userDocRef = doc(db, "users", user.id);
      await updateDoc(userDocRef, {
        bagArray: deleteField()
      });
  
      console.log("Order added successfully!");
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  useEffect(() => {
    const fetchBagArray = async () => {
      if (user && user.bagArray && user.bagArray.length > 0) {
        const productIds = user.bagArray.map((item) => item.id);
        const productsQuery = query(
          collection(db, "products"),
          where("id", "in", productIds)
        );

        try {
          const querySnapshot = await getDocs(productsQuery);
          const products = querySnapshot.docs.map((doc) => doc.data());
          setBagArray(products);
         
        
        } catch (error) {
          console.error("Error fetching bag products:", error);
        }
          
      }
    
    };

    fetchBagArray();
  }, [user?.bagArray]);

  if (bagArray.length === 0) {
    return <div>There are no items in the bag.</div>;
  }

  return (
    <div className="bag-container-2">
      {bagArray.map((product) => (
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
      ))}
      <button onClick={addToOrders} className="buy-now">Buy now </button>
    </div>
  );
}

export default Bag;
