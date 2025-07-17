import React, { useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

function ProjectCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("projects/", formData);
      alert("Project created successfully!");
      navigate("/projects"); // Go back to projects page
    } catch (error) {
      console.error("Error creating project:", error);
      let msg = "Failed to create project. ";
      if (error.response?.data) {
        const data = error.response.data;
        if (typeof data === "object") {
          msg += Object.entries(data)
            .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(", ") : errors}`)
            .join("\n");
        } else {
          msg += data;
        }
      } else {
        msg += error.message;
      }
      alert(msg);
    }
  };
  
  return (
    <div style={{
      maxWidth: "500px",
      margin: "40px auto",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      padding: "32px 24px",
    }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "24px" }}>Create Project</h2>
      <form 
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "18px" }}
      >
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius:"6px", border:"1px solid #ccc", fontSize:"16px", }}
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          style={{
             width: "100%", 
             padding: "8px", 
             marginBottom: "10px" ,
             borderRadius: "6px",
             border: "1px solid #ccc",
             fontSize: "16px",
             resize: "vertical",
          }}
        />
        <button type="submit" 
        style={{ 
          padding: "8px 16px",
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
          Create
        </button>
      </form>
    </div>
  );
}

export default ProjectCreate;
