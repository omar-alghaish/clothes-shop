import { db } from "../firebase";
import React, { useRef, useState } from "react";
import { storage } from "../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, updateDoc, doc, Timestamp } from "firebase/firestore";
import { useProducts } from "../context/ProductsContext";

function AddProducts() {
  const [cover, setCover] = useState("");
  const [images, setImages] = useState("");
  // const [message, setMessage] = useState("");
const {createProduct, message } =useProducts()
  const nameRef = useRef();
  const colorRef = useRef();
  const priceRef = useRef();
  const discountRef = useRef();
  const categoryRef = useRef();
  const genderRef = useRef();
  const discriptionRef = useRef();

  // const productsCollectionRef = collection(db, "products");
  // const createProduct = async (e) => {
  //   e.preventDefault();
  //   const name = nameRef.current.value;
  //   const color = colorRef.current.value;
  //   const price = priceRef.current.value;
  //   const discount = discountRef.current.value;
  //   const category = categoryRef.current.value;
  //   const gender = genderRef.current.value;
  //   const discription = discriptionRef.current.value;

  //   try {
  //     const coverRef =  ref(storage, `products/images/${name}/${cover.name}`);
  //     await uploadBytes(coverRef, cover);
  //     const coverUrl = await getDownloadURL(coverRef);
  //     const imagesArray = []
  //     for(let i=0; i<images.length; i++){
  //       const imageRef =  ref(storage, `products/images/${name}/${images[i].name}`);
  //       await uploadBytes(imageRef, images[i]);
  //       const imageUrl = await getDownloadURL(imageRef);
  //       imagesArray.push(imageUrl)
  //     }

  //      const productRef = await addDoc(productsCollectionRef, {
  //       cover: coverUrl,
  //       discription,
  //       name,
  //       color,
  //       price,
  //       discount,
  //       category,
  //       gender,
  //       imagesArray,
  //       date: Timestamp.now()
  //     }
    
  //     ).then(() => {

  //       setMessage("product added succssfully");
  //       setTimeout(() => {
  //         setMessage("");
  //       }, 3000);
  //     });
  //     const productId = productRef?.id;
  //     updateDoc(productRef, ...{id: productRef.id})
  //     // Reset the form and state
  //     nameRef.current.value = "";
  //     colorRef.current.value = "";
  //     priceRef.current.value = "";
  //     discountRef.current.value = "";
  //     categoryRef.current.value = "";
  //     genderRef.current.value = "";
  //     discriptionRef.current.value = "";
  //     setCover("");
      
  //   } catch (error) {
  //     console.log("Error creating product:", error);
  //   }
  // };

  return (
    <div className="add-product-container">
      <div className="main-container">
        <div className="inputs-container">
          <h2>Add product</h2>
          <form action="" onSubmit={(e)=>createProduct(e,{cover,images,nameRef,colorRef,priceRef,discountRef,discriptionRef,genderRef,categoryRef})}>
            <input type="text" ref={nameRef} placeholder="name" required/>
            <input type="text" ref={colorRef} placeholder="color" />
            <input type="text" ref={priceRef} placeholder="price" />
            <input type="text" ref={discountRef} placeholder="discount" />
            <input type="text" ref={categoryRef} placeholder="category" />
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
            <div className="cover">
              <h3>product cover</h3>
              <label for="image" class="drop-container" id="dropcontainer">
                <span class="drop-title">Drop files here</span>
                or
                <input
                  type="file"
                  onChange={(e) => {
                    setCover(e.target.files[0]);
                  }}
                  placeholder="cover"
                  accept="image/*"
                  required
                />
              </label>
            </div>
            <div className="product-images">
              <h3>product pictures</h3>

              <label for="images" class="drop-container" id="dropcontainer">
                <span class="drop-title">Drop files here</span>
                or
                <input
                  type="file"
                  onChange={(e) => {
                    setImages(e.target.files);
                  }}
                  multiple
                  accept="image/*"
                />
              </label>
            </div>

            <input className="submit" type="submit" value="add" />
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default AddProducts;
