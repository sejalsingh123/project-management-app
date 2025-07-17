import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

function Login(){
    const {loginUser} = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = (e)=>{
      e.preventDefault();
      loginUser(username,password)
    }

   return(
    <div
     style={{
      maxWidth: "400px",
      margin: "60px auto",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      padding: "32px 24px",
     }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "24px" }}>Login</h2>
      <form 
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "18px" }}
      >
          <input 
            type="text"
            placeholder="Username or Email"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
          <input
            type="password"
            placeholder="Passwword"
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
          <button
           type="submit"
           style={{
            padding: "10px 0",
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "17px",
            fontWeight: 600,
            cursor: "pointer",
            marginTop: "8px",
           }} 
          >Login</button>
        </form>
    </div>

   )
}
export default Login