import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  doc,
  collection,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useUser } from "../context/UserContext";
import { db } from "../firebase";

function Card(props) {
  const [isLoved, setIsLoved] = useState(false);

  const { user } = useUser();
  const handleLoveButton = async () => {
    try {
      const userRef = doc(db, "users", `${user.id}`);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const user1 = userSnapshot.data();
        const productID = props.id;

        if (!user1.lovedArray || !user1.lovedArray.includes(productID)) {
          // Add the product ID to the lovedArray
          await updateDoc(userRef, {
            lovedArray: arrayUnion(productID),
          });

          console.log("Product added to lovedArray!");
          setIsLoved(true); // Set isLoved to true after adding the product
        } else {
          // Remove the product ID from the lovedArray
          await updateDoc(userRef, {
            lovedArray: user1.lovedArray.filter((id) => id !== productID),
          });

          console.log("Product removed from lovedArray!");
          setIsLoved(false); // Set isLoved to false after removing the product
        }
      } else {
        console.log("User document does not exist.");
      }
    } catch (error) {
      console.error("Error fetching user document:", error);
    }
  };

  useEffect(() => {
    // Check if the product is loved by the user
    if (user) {
      setIsLoved(user.lovedArray?.includes(props.id) ?? false);
    }
  }, [user, props.name]);

  return (
    <div className="card">
      <div
        className={`statement ${props.statement === "SALE" ? "sale" : null} ${
          props.statement === "SOLD" ? "sole" : null
        } ${props.statement === "FRESH" ? "fresh" : null}`}
      >
        <p>{props.statement}</p>
      </div>
      <div className="options">
        <button onClick={handleLoveButton}>
          {isLoved ? (
            <i class={`fa-solid fa-heart love ${isLoved ? "loved" : null}`}></i>
          ) : (
            <i class="fa-regular fa-heart"></i>
          )}
        </button>
      </div>
      <Link to={`/products/${props.id}`}>
        <div className="cover-container">
          <img src={props.cover} alt="" />
        </div>

        <div className="details">
          <div>
            <h3 className="title">{props.name}</h3>
            <div className="categories">
              {Array.isArray(props.category) ? (
                // Check if props.category is an array before mapping
                props.category.map((category, index) => (
                  <p key={index}>
                    {category}
                    {index < category.length ? "," : null}
                  </p>
                ))
              ) : (
                // If it's not an array or doesn't exist, show a default message
                <p>{props.category}</p>
              )}
            </div>
            {props?.discount ? (
              <div className="price-section">
                <div className="discount">
                  {props.discount && <span>{props.discount}EGY</span>}
                </div>

                <div className="price">
                  <del>{props.price}</del>EGY{" "}
                </div>
              </div>
            ) : (
              <div className="price">{props.price}$ </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
