import { useState } from "react";
import API from "../services/api";
import { showSuccess, showError } from "../utils/toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      showSuccess("Registration Successful!");
      console.log(response.data);

      // Optional: Clear form after successful registration
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.response?.data);
      showError(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "10px",
            margin: "10px",
            width: "250px",
          }}
        />

        <br />

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
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;