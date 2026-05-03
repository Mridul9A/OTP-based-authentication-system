import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Otp() {
  const [otp, setOtp] = useState(""); // user-entered OTP
  const [error, setError] = useState(""); // error message
  const navigate = useNavigate();

  // Retrieve identifier saved during login step
  const identifier = localStorage.getItem("identifier");

  const handleVerify = async () => {
    setError("");

    // Basic validation
    if (!otp.trim()) return setError("OTP is required");

    try {
      // Verify OTP with backend
      const res = await API.post("/auth/verify-otp", {
        identifier,
        otp
      });

      // Save token for authenticated requests
      localStorage.setItem("token", res.data.token);

      // Redirect to protected page
      navigate("/welcome");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Verify OTP</h2>

      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <br /><br />

      <button onClick={handleVerify}>Verify</button>

      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
}