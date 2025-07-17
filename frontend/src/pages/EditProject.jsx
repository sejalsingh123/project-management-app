import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

function ProjectEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axiosInstance.get(`projects/${id}/`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`projects/${id}/`, formData);
      alert("Project updated successfully!");
      navigate("/projects");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto" }}>
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Update
        </button>
      </form>
    </div>
  );
}

export default ProjectEdit;
