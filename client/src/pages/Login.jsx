import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Login submitted");

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

    localStorage.setItem("token", response.data.token);
alert("Login Successful!");
navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
   

    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            margin: "10px",
            width: "250px",
          }}
        />

      <br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: "10px",
          margin: "10px",
          width: "250px",
        }}
      />

      <br />

      <button
        type="submit"
          
        style={{
          padding: "10px 20px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Login
      </button>
    </form>
    </div>
    
  );
}

export default Login;