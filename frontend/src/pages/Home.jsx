import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Footer from "../components/Footer";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div
      style={{
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#f5f7fa",
        color: "#333",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "#fff",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "50px", marginBottom: "20px" }}> Welcome to TaskSync</h1>
        <p style={{ fontSize: "20px", maxWidth: "700px", margin: "0 auto" }}>
          A modern, elegant way to manage your projects and tasks. Collaborate, assign, and track progress seamlessly.
        </p>
        
      </section>

      {/* About Section */}
      <section
        style={{
          maxWidth: "1000px",
          margin: "50px auto",
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "30px", marginBottom: "15px", color: "#333" }}> About TaskSync</h2>
        <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#555" }}>
          TaskSync is designed to empower teams and individuals to stay productive. With real-time updates,
          role-based access, and powerful collaboration tools, it’s the perfect solution for efficient project management.
        </p>
        <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#555" }}>
          Whether you’re a developer, manager, or part of a large enterprise, TaskSync scales to meet your needs.
        </p>
      </section>

      {/* User Profile */}
      {user && (
        <section
          style={{
            maxWidth: "800px",
            margin: "40px auto",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
          }}
        >
          {user.attachment ? (
            <img
              src={user.attachment}
              alt="Profile"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "20px",
              }}
            />
          ) : (
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "#cbd5e1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
                color: "#64748b",
                marginRight: "20px",
              }}
            >
              👤
            </div>
          )}
          <div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "22px" }}>{user.username}</h3>
            <p style={{ margin: "0 0 5px 0", color: "#555" }}>📧 {user.email}</p>
            <p style={{ margin: 0, color: "#4b5563" }}>🛡 Role: {user.role}</p>
          </div>
        </section>
      )}

      
    </div>
  );
};

export default Home;
