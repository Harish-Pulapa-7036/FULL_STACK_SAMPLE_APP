import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {Navigate} from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const { userData } = useContext(AuthContext);
  return userData ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
