import { useContext, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Projects from "./pages/Projects";
import AuthContext from "./context/AuthContext";
import Navbar from "./components/Navbar";
import "./App.css";
import ProjectCreate from './pages/ProjectCreate';
import ProjectEdit from './pages/EditProject';
import EditTask from './pages/EditTask';
import AddTask from './pages/AddTask';
import Home from './pages/Home';
import Footer from './components/Footer';

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        /> 
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route 
          path='/projects/create'
          element={
            <PrivateRoute>
              <ProjectCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects/:id/edit"
          element={
            <PrivateRoute>
              <ProjectEdit />
            </PrivateRoute>
          }
        />
        <Route 
          path='/tasks/:id/edit' 
          element={
            <PrivateRoute>
              <EditTask />
            </PrivateRoute>
          }
        />
        <Route 
          path='/projects/:id/add-task' 
          element={
            <PrivateRoute>
              <AddTask />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

