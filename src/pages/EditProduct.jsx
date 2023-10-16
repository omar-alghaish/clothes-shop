import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";

function EditProduct() {
  const { id } = useParams();
  const { editProductsData } = useProducts();

  const nameRef = useRef();
  const colorRef = useRef();
  const priceRef = useRef();
  const discountRef = useRef();
  const categoryRef = useRef();
  const genderRef = useRef();
  const discriptionRef = useRef();
  const statementRef = useRef();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const updatedProduct = { 
           name: nameRef.current.value,

    //   color: colorRef.current?.value,
    //   price: priceRef.current?.value,
    //   discount: discountRef.current?.value,
    //   category: categoryRef.current?.value,
    //   gender: genderRef.current?.value,
    //   description: discriptionRef.current?.value,
    //   statement: statementRef.current?.value,
    };

    // Call the editProductsData function with the updated product data
    editProductsData(id, updatedProduct);

    // Reset the form fields
    // nameRef.current.value = "";
    // colorRef.current.value = "";
    // priceRef.current.value = "";
    // discountRef.current.value = "";
    // categoryRef.current.value = "";
    // genderRef.current.value = "";
    // discriptionRef.current.value = "";
    // statementRef.current.value = "";
  };

  return (
    <div className="add-product-container">
      <div className="main-container">
        <div className="inputs-container">
          <h2>Edit Product</h2>
          <form onSubmit={handleFormSubmit}>
          <input type="text" ref={nameRef} placeholder="name" />
            <input type="text" ref={colorRef} placeholder="color" />
            <input type="text" ref={priceRef} placeholder="price" />
            <input type="text" ref={discountRef} placeholder="discount" />
            <input type="text" ref={categoryRef} placeholder="category" />
            <input type="text" ref={statementRef} placeholder="statement" />

            <div className="gender">
              <div>
                <input
                  type="radio"
                  name="gender"
                  id="men"
                  ref={genderRef}
                  value="men"
                />
                <label htmlFor="men">men</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  id="women"
                  ref={genderRef}
                  value="women"
                />
                <label htmlFor="women">women</label>
              </div>
            </div>

            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              ref={discriptionRef}
            ></textarea>

            <input className="submit" type="submit" value="Update" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;