import { useTranslation } from "react-i18next";
import "./sass/style.css";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import ForgetPassword from "./commponents/ForgetPassword";
import UpdateProfile from "./commponents/UpdateProfile";
import Profile from "./pages/Profile";
import RequireAuth from "./context/RequireAuth";
import Header from "./commponents/Header";
import AddProducts from "./commponents/AddProducts";
import AdminRoute from "./commponents/AdminRoute";
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import Admin from "./pages/Admin";
import EditProduct from "./pages/EditProduct"
import { UseTranslation } from "react-i18next";
import LandingPage from "./pages/LandingPage";
import Footer from "./commponents/Footer";
import { IsAdmin } from "./logic/Logic";
import Logo from "./commponents/Logo";
function App() {

const [t, i18n] = useTranslation();


  const isDarkMode = useSelector((state) => state.theme.darkMode);
// if(!IsAdmin()){
//   return <div style={{height:"100vh", display:"flex", alignItems:"center", justifyContent:"center", color:"white",background:"red", flexDirection:"column"}}><div ><Logo /> </div>COMING SOON</div>
// }
  return (
    <div
      data-theme={`${isDarkMode ? "dark" : "light"}`}
      className={`App ${isDarkMode ? "dark" : "light"}`}
    >
      <Router>
        <Header />
        <Routes>
         ( 
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />

          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
         />
            <Route
            path="/admin/add-product"
            element={
              <AdminRoute>
                <AddProducts />
              </AdminRoute>
            }
          />
            <Route
            path="/admin/product/:id"
            element={
              <AdminRoute>
                <EditProduct />
              </AdminRoute>
            }
          />
          <Route
            path="*"
            element={
              <div
                style={{
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                page not found{" "}
                <Link to="/">
                  {" "}
                  <b>Home</b>
                </Link>
              </div>
            }
          />)
         
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

// const [t, i18n] = useTranslation()
// const changelang =()=>{
//   i18n.changeLanguage('ar')
// }

// const isDarkMode = useSelector((state) => state.theme.darkMode);

//   return <div data-theme={`${isDarkMode ? 'dark' : 'light'}`} className={`app ${isDarkMode ? 'dark' : 'light'}`}>
//     {t('title')}
//     <button onClick={changelang} >change</button>
//     <h1>My App</h1>
//       <p>Welcome to my app!</p>
//     <ThemeToggle />
//   </div>;
