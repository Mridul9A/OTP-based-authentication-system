import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Welcome() {
  const [user, setUser] = useState(null); // store user info

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user details using token 
        const res = await API.get("/auth/me");
        setUser(res.data.user);
      } catch {
        // If token is invalid/expired → logout
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    };

    fetchUser();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Welcome 🎉</h2>

      {/* Show user info after successful fetch */}
      {user ? (
        <p>Logged in as: {user.identifier}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}