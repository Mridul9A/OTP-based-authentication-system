import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import Welcome from "./pages/Welcome";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route
          path="/welcome"
          element={
            <PrivateRoute>
              <Welcome />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}