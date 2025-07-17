import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <nav style={{backgroundColor:"black"}}>
      <div>
        <Link to="/">Home</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link> |{" "}
        <Link to="/projects">Projects</Link>  

      </div>
      <div>
        {user ? (
          <>
            <span style={{ color: "white" , fontWeight: "bold"}}>Welcome, {user.username}</span> {" "}
            <button onClick={logoutUser}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> | <Link to="/register">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

