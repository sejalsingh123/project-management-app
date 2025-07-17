import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import TaskItem from "../components/TaskItem"
import AuthContext from "../context/AuthContext";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [totalPages, setTotalPages] = useState(1)
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  const fetchProjects = async () => {
    

    try {
      let url = `projects/?page=${page}`;
      if (search) url += `&q=${search}`;
      const response = await axiosInstance.get(url);
      setProjects(Array.isArray(response.data.results) ? response.data.results : []);
      setHasNext(!!response.data.next);
      setHasPrev(!!response.data.previous);
      setTotalPages(Math.ceil(response.data.count / 3))
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, [page, search]);

  const deleteProject = async(projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axiosInstance.delete(`projects/${projectId}/`);
        alert("Project deleted!");
        setProjects((prev) =>
          prev.filter((p) => p.id !== projects.id)
        );
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page when searching
  };


  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>📁 Projects</h1>

      {["admin", "manager"].includes(user.role) && (
        <Link
          to="/projects/create"
          style={{
            display: "inline-block",
            marginBottom: "15px",
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
        ➕ Create New Project
        </Link>
      )}

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          placeholder="Search projects..."
          value={search}
          onChange={handleSearch}
        />
      </div>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>
              <strong>Owner:</strong> {project.created_by}
            </p>
            <h4>Tasks:</h4>
          
            {Array.isArray(project.tasks) && project.tasks.length > 0 ? (
              project.tasks.map((task)=>(
                <TaskItem 
                  key={task.id}
                  task={task}
                  refreshTask={fetchProjects}
                />
              ))
            ) : (
              <p>No tasks in this project</p>
            )}
  
            <button
              onClick={() => navigate(`/projects/${project.id}/add-task`)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                borderRadius: "4px",
                marginTop: "10px",
              }}
            >
              ➕ Add Task
            </button>
            {["admin", "manager"].includes(user.role) && (
              <div style={{marginTop:"10px"}}>
               <button
                 onClick={() => navigate(`/projects/${project.id}/edit`)}
                 style={{ marginRight: "10px" }}
               >
                 ✏️ Edit
               </button>
               <button
                 onClick={() => {deleteProject(project.id)}}
                 style={{ backgroundColor: "red", color: "white" }}
               >
                 🗑 Delete
               </button>
              </div>

            )}
          </div>
        ))
      )}
      <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
        {page>1 && (
        <button disabled={!hasPrev} onClick={() => setPage((prev) => prev - 1)}>
          ⬅ Prev
        </button>
        )}
        {page<totalPages && (
        <button disabled={!hasNext} onClick={() => setPage((prev) => prev + 1)}>
          Next ➡
        </button>
        )}
      </div>
      
    </div>
  );
}

export default Projects;
