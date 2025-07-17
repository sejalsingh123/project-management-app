import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import axiosInstance from "../api/axios"; // Use axiosInstance here
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    role: "member",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axiosInstance.post("register/", formData); // relative URL with axiosInstance
      // Auto-login after signup
      await loginUser(formData.username, formData.password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during signup:", error);
      alert(
        "Signup failed. Please check your details. " +
          (error.response?.data?.detail || error.message)
      );
    }
  };

  return (
  <div
    style={{
      maxWidth: "420px",
      margin: "50px auto",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      padding: "32px 24px",
    }}
  >
    <h2 style={{ textAlign: "center", color: "#333", marginBottom: "24px" }}>
      Signup
    </h2>
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "18px" }}
    >
      <input
        name="username"
        type="text"
        placeholder="Username"
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <input
        name="password2"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <select
        name="role"
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      >
        <option value="member">Employee</option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>
      <button
        type="submit"
        style={{
          padding: "10px 0",
          background: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "17px",
          fontWeight: 600,
          cursor: "pointer",
          marginTop: "8px",
        }}
      >
        Register
      </button>
    </form>
  </div>
)
}

export default Signup;
