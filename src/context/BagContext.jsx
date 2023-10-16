import React, { createContext, useContext, useState } from "react";

const BagContext = createContext();

export const useBag = () => useContext(BagContext);

export const BagProvider = ({ children }) => {
  const [bagItems, setBagItems] = useState([]);

  return (
    <BagContext.Provider value={{ bagItems, setBagItems }}>
      {children}
    </BagContext.Provider>
  );
};