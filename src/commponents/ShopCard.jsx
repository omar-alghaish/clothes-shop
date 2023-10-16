import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Card(props) {
  const { currentUser } = useAuth();
  const isAdmin = currentUser && currentUser.email === "omaralghish@gmail.com";

  return (
    <Link to={`/products/${props.id}`}>
      <div className="shop-card">
        <div
          className={`statement ${props.statement === "SALE" ? "sale" : null} ${
            props.statement === "SOLD" ? "sole" : null
          } ${props.statement === "FRESH" ? "fresh" : null}`}
        >
          <p>{props.statement}</p>
        </div>
        {isAdmin ? (
          <div className="edit">
            <Link to={`/admin/product/${props.id}`}>edit</Link>
          </div>
        ) : null}

        <div className="cover-container">
          <img src={props.cover} alt="" />
        </div>
        <div className="details">
          <div>
            <h3 className="title">{props.name}</h3>
            {props?.discount ? (
              <div className="price-section">
                <div className="price">{props.price}$ </div>{" "}
                <div className="discount">
                  {props.discount && <del>{props.discount}$</del>}
                </div>
              </div>
            ) : (
              <div className="price">{props.price}$ </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
