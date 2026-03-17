import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { FaUser } from "react-icons/fa6";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="site-header">
      <div className="container site-header__inner">
        <div className="nav-links">
          <Link to="/" className="brand">
            BlogHub
          </Link>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </div>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <Link to="/create" className="nav-link">
                Create Post
              </Link>
              <span className="nav-user">
                <FaUser /> {user?.username}
              </span>
              <button type="button" onClick={handleLogout} className="button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
