import React, { useContext }  from "react";
import './TaskCard.css'
import { useNavigate } from "react-router-dom";
import Comment from "./Comment";
import AuthContext from "../context/AuthContext";

const TaskCard = ({ task }) => {
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>
      <p><strong>Assigned to:</strong> {task.assigned_to}</p>
      <>
      {user.username === task.assigned_to && (
      <button onClick={() => navigate(`/tasks/${task.id}/edit`)}
         style={{ marginRight: "10px"}}
        >
        ✏️ Edit
      </button>
      )}
      </>
      <Comment taskId={task.id} />
    </div>
  );
};
  
export default TaskCard;
