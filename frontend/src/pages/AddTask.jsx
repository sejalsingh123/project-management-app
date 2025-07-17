import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

function AddTask() {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState("on_hold");

  const fetchUsers = async() => {
    let url = "/users"
    let allUsers = []
    try {
      while (url) {
        const response = await axiosInstance.get(url);
        allUsers = [...allUsers, ...response.data.results];
        url = response.data.next; // null if no more pages
      }
      // Filter only "member" users
      const memberUsers = allUsers.filter(user => user.role === "member");
      setUsers(memberUsers)
    } catch (error) {
      console.error("Error fetching users:", error)
      setUsers([])
    }
  }
  useEffect(() => {
     fetchUsers()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/tasks/", {
        title,
        description,
        status,
        assigned_to: assignedTo,
        project: projectId,
      });
      alert("Task added successfully ✅");
      navigate("/projects"); // redirect back to projects page
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task ❌");
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
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "24px" }}>Add Task for Project #{projectId}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius:"6px", border:"1px solid #ccc", fontSize:"16px", }}
          /> 
        </div>
        <div style={{marginBottom: "10px" ,}}>
          <label >Description</label>
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="on_hold">Hold</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Done</option>
          </select>
        </div>
        <div style={{marginBottom:"10px"}}>
          <label >Assign To</label>
          <select
             value={assignedTo}
             onChange={(e) => setAssignedTo(e.target.value)}
             required
          >
            <option value="">Select Employee</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            borderRadius: "4px",
          }}
        >
          ➕ Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
