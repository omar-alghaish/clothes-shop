import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IsAdmin } from "../logic/Logic";
const AdminRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // Check if the current user is authenticated and has the role of "admin"
  // const isAdmin = currentUser && currentUser.email === ;
  const location = useLocation();
  if (!IsAdmin()) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }
  return children;
};

export default AdminRoute;
