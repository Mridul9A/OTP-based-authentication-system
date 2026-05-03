import { Navigate } from "react-router-dom";

// Protect routes: allow access only if token exists
export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // If authenticated → render page, else redirect to login
  return token ? children : <Navigate to="/" />;
}