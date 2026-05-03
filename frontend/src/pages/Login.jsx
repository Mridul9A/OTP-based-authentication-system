import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [identifier, setIdentifier] = useState(""); // email or phone
  const [error, setError] = useState(""); // error message
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");

    // Basic validation
    if (!identifier.trim()) {
      return setError("Email or phone is required");
    }

    try {
      // Request OTP from backend
      await API.post("/auth/request-otp", { identifier });

      // Store identifier for next step (OTP page)
      localStorage.setItem("identifier", identifier);

      // Navigate to OTP verification page
      navigate("/otp");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email or phone"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Send OTP</button>

      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
}