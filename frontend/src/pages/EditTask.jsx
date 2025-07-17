import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { id } = useParams(); // Task ID from URL
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    status: "on_hold",
    description: "",
    assigned_to: "",
    project_name: "",
  });
  const [users, setUsers] = useState([]); // For assigned_to dropdown

  // Fetch task details
  const fetchTask = async () => {
    try {
      const response = await axiosInstance.get(`tasks/${id}/`);
      setTask({
        title: response.data.title || "",
        status: response.data.status || "on_hold",
        description: response.data.description || "",
        assigned_to: response.data.assigned_to?.id || "",
        project_name: response.data.project_name || "N/A",
      });
    } catch (error) {
      console.error("Error fetching task:", error);
      alert("Failed to load task details");
    }
  };

  // Fetch users for "assigned_to" dropdown
  const fetchUsers = async () => {
    let url = "/users/"
    let allUsers = []
    try {
      while (url) {
        const response = await axiosInstance.get(url)
        allUsers = [...allUsers, ...response.data.results]
        const nextUrl = response.data.next
        if (nextUrl) {
          // ✅ Remove base URL (http://localhost:8000/api) if present
          const apiIndex = nextUrl.indexOf("/api/");
          if (apiIndex !== -1) {
            url = nextUrl.substring(apiIndex + 4); // Get relative URL after "/api"
          } else {
            url = nextUrl; // fallback
          }
        } else {
          url = null; // no more pages
        }
      }
      // Filter only "member" users
      const memberUsers = allUsers.filter(user => user.role === "member");
      setUsers(memberUsers)
    } catch (error) {
      console.error("Error fetching users:", error)
      setUsers([])
    }
  };

  useEffect(() => {
    fetchTask();
    fetchUsers();
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.patch(`tasks/${id}/`, task);
      alert("✅ Task updated successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Error updating task:",
        error.response ? error.response.data : error
      );
      alert("❌ Failed to update task.");
    }
  };

  return (
    <div 
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        padding: "32px 24px",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "24px" }}>Edit Task</h2>
      <p style={{marginBottom:"10px"}}>
        <strong>📁 Project:</strong> {task.project_name}
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius:"6px", border:"1px solid #ccc", fontSize:"16px", }}
        />

        <label>Assign To:</label>
        <select
          name="assigned_to"
          value={task.assigned_to || ""}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        >
          <option value="">-- Select User --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username} ({user.role})
            </option>
          ))}
        </select>

        <label>Description:</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          rows="4"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <label>Status:</label>
        <select
          name="status"
          value={task.status || "on_hold"}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        >
          <option value="on_hold">Hold</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Done</option>
        </select>

        <div style={{ marginTop: "15px" }}>
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            💾 Save
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              marginLeft: "10px",
              padding: "8px 16px",
              backgroundColor: "#ccc",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;

