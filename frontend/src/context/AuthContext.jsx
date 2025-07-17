import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "../api/axios"; // Use axiosInstance here

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access)
      : null
  );

  const fetchUserProfile = async (token) => {
  try {
    const response = await axios.get("/users/me/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(response.data);
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
  }
};

const loginUser = async (username, password) => {
  try {
    const response = await axios.post("token/", { username, password });
    if (response.status === 200) {
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      await fetchUserProfile(response.data.access); // 🔥 fetch user data
      navigate("/dashboard");
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed");
  }
};


  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
  }, [authTokens]);

  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
