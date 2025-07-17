import { useState, useEffect, useContext, useRef } from "react";
import axiosInstance from "../api/axios";
import AuthContext from "../context/AuthContext";

const Comment = ({ taskId }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const commentsEndRef = useRef(null); // For scrolling

  const fetchComments = async (url = `/comments/?task=${taskId}`, append = false) => {
    try {
      const response = await axiosInstance.get(url);

      if (append) {
        // Avoid duplicate comments
        setComments((prev) => {
          const ids = new Set(prev.map((c) => c.id));
          const newComments = response.data.results.filter((c) => !ids.has(c.id));
          return [...prev, ...newComments];
        });
      } else {
        setComments(response.data.results);
      }

      setNextPage(response.data.next);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axiosInstance.post("/comments/", {
        content: newComment,
        task: taskId,
      });
      // Append the new comment directly
      setComments((prev) => [...prev, response.data]);
      setNewComment("");
      scrollToBottom();
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment ❌");
    }
  };

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setComments([]); // Reset comments on task change
    fetchComments();
  }, [taskId]);

  return (
    <div
      style={{
        marginTop: "10px",
        padding: "10px",
        borderTop: "1px solid #ccc",
      }}
    >
      <h5>💬 Comments</h5>

      {comments.length === 0 ? (
        <p style={{ fontStyle: "italic" }}>No comments yet</p>
      ) : (
        <>
          {comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                backgroundColor: "#f1f1f1",
                borderRadius: "5px",
                padding: "8px",
                margin: "5px 0",
              }}
            >
              <strong>{comment.user}</strong>: {comment.content}
            </div>
          ))}
          <div ref={commentsEndRef} />
        </>
      )}

      {/* Load More Comments */}
      {nextPage && comments.length > 0 && (
        <button
          onClick={() => fetchComments(nextPage, true)}
          style={{
            marginTop: "8px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          ⬇ Load More Comments
        </button>
      )}

      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} style={{ marginTop: "10px" }}>
        <textarea
          placeholder="Write comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="2"
          style={{ width: "100%", borderRadius: "5px", padding: "5px" }}
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          style={{
            marginTop: "5px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            borderRadius: "3px",
            opacity: newComment.trim() ? 1 : 0.5,
            cursor: newComment.trim() ? "pointer" : "not-allowed",
          }}
        >
          ➕ Add Comment
        </button>
      </form>
    </div>
  );
};

export default Comment;



