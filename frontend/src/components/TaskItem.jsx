import { useContext, useState } from "react";
import axiosInstance from "../api/axios";
import AuthContext from "../context/AuthContext";



const TaskItem = ({task, refreshTask}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [status, setStatus] = useState(task.status);
    const {user} = useContext(AuthContext)

    const handleEdit = async() => {
        try {
            await axiosInstance.patch(`tasks/${task.id}/`, {
                title,
                status,
                project: task.project.id,
            })
            alert("Task updated successfully ✅")
            setIsEditing(false);
            refreshTask()
        } catch (error) {
            console.error("Error updating task:", error)
            alert("Failed to update task.❌")
        };
    }
    
    const handleDelete = async() => {
        if(window.confirm("Are you sure you want to delete this task?")) {
            try {
               await axiosInstance.delete(`tasks/${task.id}/`)
                alert("Task deleted ✅")
                refreshTask()
            } catch (error) {
                console.error("Error deleting task: ", error)
                alert("Failed to delete task.❌")
                
            }
        }
    }

    return(
        <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "15px", marginBottom: "15px", backgroundColor: "#f9f9f9" }}>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                    >
                        <option value="on_hold">Hold</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Done</option>
                    </select>
                    <button onClick={handleEdit} style={{ padding: "8px 16px" , marginRight:"10px"}}>Save</button>
                    <button onClick={()=>setIsEditing(false)} style={{ padding: "8px 16px" }}>Cancel</button>
                </div>
            ) : (
                
                  <div>
                      <h4>{task.title}</h4>
                      <p>Status: {task.status}</p>
                      {["admin", "manager"].includes(user.role) && (
                        <>
                          <button onClick={() => setIsEditing(true)} style={{ padding: "8px 16px", marginRight: "10px" }}>Edit</button>
                          <button onClick={handleDelete} style={{ padding: "8px 16px", backgroundColor: "grey", color: "white" }}>Delete</button>
                        </>
                      )}
                  </div>
               
            )}
        </div>
    )
}

export default TaskItem