import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import TaskCard from "../components/TaskCard";
import AuthContext from "../context/AuthContext";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
  const [status, setStatus] = useState("");
  const { logoutUser } = useContext(AuthContext);

  const fetchTasks = async () => {
    let url = `tasks/?page=${page}`;
    if (search) url += `&q=${search}`;
    if (status) url += `&status=${status}`;

    try {
      const res = await axiosInstance.get(url);
      setTasks(res.data.results || res.data)
      setTotalPages(Math.ceil(res.data.count / 3))  //3 because in backend we have st pagination for 3
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, search, status]);

  return (
    <div className="container">
      <h1>📋 Dashboard</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="on_hold">Hold</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Done</option>
        </select>
      </div>
 
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}

      <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
        {page>1 && (
        <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
          ⬅ Prev
        </button>
        )}
        {page<totalPages && (
        <button onClick={() => setPage((prev) => prev + 1)}>Next ➡</button>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
