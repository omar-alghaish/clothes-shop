import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import MultiRangeSlider from "../commponents/MultiRangeSlider";
const FilterComponent = () => {
  const fetchFilteredProducts = async (filters) => {
    const productsRef = collection(db, "products");

    // Create a query with the selected filter options
    let filteredQuery = query(productsRef);

    // Apply filters based on selected options
    if (filters.category) {
      filteredQuery = query(
        productsRef,
        where("category", "==", filters.category)
      );
    }

    if (filters.price) {
      filteredQuery = query(productsRef, where("price", "==", filters.price));
    }

    // Fetch the filtered products
    const snapshot = await getDocs(filteredQuery);
    const products = snapshot.docs.map((doc) => doc.data());

    // Process the fetched products
    // ...

    console.log(); // Filtered products
  };

  const [filters, setFilters] = useState({
    category: "",
    price: "",
  });

  const handleCategoryChange = (event) => {
    setFilters({ ...filters, category: event.target.value });
  };

  const handlePriceChange = (event) => {
    setFilters({ ...filters, price: event.target.value });
  };

  const handleFilter = () => {
    fetchFilteredProducts(filters);
  };

  return (
    <div>
      <div className="side-bar-container">
        <div className="category">
          <h3>Category</h3>

          <div>
            <input type="radio" name="size" id="size0" checked value="" />
            <label for="size0">Jeans</label>
          </div>
          <div>
            <input type="radio" name="size" id="size1" checked />
            <label for="size0">T-shirts</label>
          </div>
          <div>
            <input type="radio" name="size" id="size2" checked />
            <label for="size0">Jackets</label>
          </div>
          <div>
            <input type="radio" name="size" id="size3" checked />
            <label for="size0">shirts</label>
          </div>
        </div>
        <div className="price">
          <h3>Price</h3>
          <MultiRangeSlider
            min={0}
            max={1000}
            onChange={({ min, max }) =>
              console.log(`min = ${min}, max = ${max}`)
            }
          />
        </div>
        <div className="size">
          <h3>Size</h3>
          <div>
            <input type="radio" name="size" id="size0" checked value="" />
            <label for="size0">Small</label>
          </div>
          <div>
            <input type="radio" name="size" id="size1" checked />
            <label for="size0">Medium</label>
          </div>
          <div>
            <input type="radio" name="size" id="size2" checked />
            <label for="size0">Large</label>
          </div>
          <div>
            <input type="radio" name="size" id="size3" checked />
            <label for="size0">X-Large</label>
          </div>
        </div>
        <button className="filter" onClick={handleFilter}>
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
