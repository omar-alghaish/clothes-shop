import React, { useState, useEffect } from "react";

  import { useProducts } from "../context/ProductsContext";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
 

 
  const {products, fetchPageData} = useProducts();
  const handleFetchPageData = async () => {
    const updatedProducts = await fetchPageData(currentPage);
    console.log(updatedProducts);
  };


  useEffect(() => {
handleFetchPageData(currentPage)
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (products.currentPage < products.totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } 
       console.log(currentPage)

  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="pagination-container">
      {/* Render pagination controls */}
      <button onClick={handlePreviousPage} disabled={products.currentPage === 1}>
        Previous
      </button>
      {Array.from({ length: products.totalPages }, (_, index) => (
        <button key={index} onClick={() => handlePageClick(index + 1)}>
          {index + 1}
        </button>
      ))}
      <button onClick={handleNextPage} disabled={products.currentPage === products.totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
