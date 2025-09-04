import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("loggedInUser"))

  if (!userData) {
    toast.warn("Please login first!")
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;