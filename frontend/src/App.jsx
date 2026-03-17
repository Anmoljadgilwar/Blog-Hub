import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogList from "@/pages/BlogList";
import BlogPost from "@/pages/BlogPost";
import CreatePost from "@/pages/CreatePost";
import EditPost from "@/pages/EditPost";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import "./index.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-shell">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/post/:id" element={<BlogPost />} />
              <Route
                path="/post/:id/edit"
                element={
                  <PrivateRoute>
                    <EditPost />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/create"
                element={
                  <PrivateRoute>
                    <CreatePost />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
