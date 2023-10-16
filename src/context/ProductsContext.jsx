import React, { useContext, createContext, useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  doc,
  updateDoc,
  where,
  orderBy,
  startAfter,
  limit,
  getDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const ProductsContext = createContext();
const ProductsProvider = ({ children }) => {
  const productsRef = collection(db, "products");
  const [products, setProducts] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
    pageData: [],
  });
  const [product, setProduct] = useState();
  const [message, setMessage] = useState();

  const pageSize = 10;

  const fetchPageData = async (page) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const q = query(collection(db, "products"));

    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.slice(startIndex, endIndex);

    const pageData = docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const q2 = query(collection(db, "products"));
    const querySnapshot2 = await getDocs(q2);

    const totalItems = querySnapshot2.size;
    const totalPages = Math.ceil(totalItems / pageSize);

    setProducts({
      ...products,
      pageData,
      currentPage: page,
      totalPages,
      totalItems,
    });
    return {
      ...products,
      pageData,
      currentPage: page,
      totalPages,
      totalItems,
    };
  };

  const fetchAllProducts = async () => {
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    data.map(async (document) => {
      const productRef = doc(db, "products", document.id);
      await updateDoc(productRef, { ...document, id: document.id });
    });
  };

  const fetchProduct = async (id) => {
    try {
      const productRef = doc(collection(db, "products"), id);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
        setProduct(productSnapshot.data());
      } else {
        // Handle case when the document doesn't exist
        console.log("Product not found");
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching product:", error);
    }

  };

  const createProduct = async (e,{nameRef, colorRef, priceRef,discountRef, categoryRef, genderRef, discriptionRef, cover, images}) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const color = colorRef.current.value;
    const price = priceRef.current.value;
    const discount = discountRef.current.value;
    const category = categoryRef.current.value;
    const gender = genderRef.current.value;
    const discription = discriptionRef.current.value;

    try {
      const productsCollectionRef = collection(db, "products");

      const coverRef =  ref(storage, `products/images/${name}/${cover.name}`);
      await uploadBytes(coverRef, cover);
      const coverUrl = await getDownloadURL(coverRef);
      const imagesArray = []
      for(let i=0; i<images.length; i++){
        const imageRef =  ref(storage, `products/images/${name}/${images[i].name}`);
        await uploadBytes(imageRef, images[i]);
        const imageUrl = await getDownloadURL(imageRef);
        imagesArray.push(imageUrl)
      }

       const productRef = await addDoc(productsCollectionRef, {
        cover: coverUrl,
        discription,
        name,
        color,
        price,
        discount,
        category : category.split(","),
        gender,
        imagesArray,
        date: Timestamp.now()
      }
    
      ).then(() => {

        setMessage("product added succssfully");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
      const productId = productRef?.id;
      // updateDoc(productRef, ...{id: productRef.id})
      // Reset the form and state
      nameRef.current.value = "";
      colorRef.current.value = "";
      priceRef.current.value = "";
      discountRef.current.value = "";
      categoryRef.current.value = "";
      genderRef.current.value = "";
      discriptionRef.current.value = "";
      // setCover("");
      
    } catch (error) {
      console.log("Error creating product:", error);
    }
    fetchAllProducts()
  };



  const getFreshProducts = async (category) => {
    const q = query(productsRef, where("statement", "==", category));
    const snapShot = await getDocs(q);
    const pageData = snapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const totalItems = snapShot.size;
    const totalPages = Math.ceil(totalItems / pageSize);

    setProducts({
      ...products,
      pageData,
      // currentPage: page,
      totalPages,
      totalItems,
    });
    console.log("done");
  };

  const editProductData = async (documentId, ...newData) => {
    try {
      // const documentRef = doc(db, "collectionName", documentId);
      const productRef = doc(db, "products", documentId);
      await updateDoc(productRef, newData);

      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  useEffect(() => {
    fetchPageData(1);
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        fetchPageData,
        fetchAllProducts,
        fetchProduct,
        editProductData,
        getFreshProducts,
        product,
        createProduct,
        message
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;

export const useProducts = () => {
  return useContext(ProductsContext);
};
