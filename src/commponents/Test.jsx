import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, startAfter, limit } from 'firebase/firestore';
import { db } from '../firebase';

const PAGE_SIZE = 2;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [lastDocument, setLastDocument] = useState(null);

  const fetchProducts = async () => {
    try {
      const productsRef = collection(db, 'products');
      let productsQuery = query(productsRef, limit(PAGE_SIZE));

      if (lastDocument) {
        productsQuery = query(productsQuery, startAfter(lastDocument));
      }

      const querySnapshot = await getDocs(productsQuery);
      const newProducts = querySnapshot.docs.map((doc) => doc.data());
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);

      if (querySnapshot.docs.length > 0) {
        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
      } else {
        // No more products to fetch
        setLastDocument(null);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleScroll = () => {
    // Check if the user has scrolled to the bottom
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchProducts();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div style={{height: "50vh"}}>{product.name}</div>
      ))}
    </div>
  );
}

export default ProductList;