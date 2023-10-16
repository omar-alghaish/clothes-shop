import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import AuthProvider from "./context/AuthContext";
import ProductsProvider from "./context/ProductsContext";
import UserProvider from "./context/UserContext";
import { BagProvider } from "./context/BagContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthProvider>
     <UserProvider>
      <ProductsProvider>
        <BagProvider>
          <App />
        </BagProvider>
        
      </ProductsProvider>
            </UserProvider> 

    </AuthProvider>
  </Provider>
);
