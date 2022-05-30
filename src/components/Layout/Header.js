import React from "react";
import { auth } from "../../firebase/firebase_config";
import { Link, useNavigate } from "react-router-dom";

function Header({ user, usersCount, signOut }) {
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <header className="nav-header">
      <p className="no-of-users">
        <i className="fa-solid fa-users"></i> <span>{usersCount}</span>
      </p>
      <nav>
        <ul>
          <li className="list-item">
            <Link to="/">Home</Link>
            <i className="fa-solid fa-house"></i>
          </li>
          <li className="list-item">
            <Link to="/login">Login</Link>
            <i className="fa-solid fa-right-to-bracket"></i>
          </li>
          <li className="list-item">
            <Link to="/register">Register</Link>
            <i className="fa-solid fa-user-plus"></i>
          </li>

          <li className="list-item">
            <Link to="/how-it-works">How It Works</Link>
            <i className="fa-solid fa-question"></i>
          </li>
        </ul>
      </nav>

      {user && (
        <div className="logged-user">
          <p>
            <i className="fa-solid fa-user"></i>
            <Link to={`/user/${user.uid}`}>
              <span>{user?.email}</span>
            </Link>
          </p>

          <button className="btn secondary-btn" onClick={logout}>
            Sign Out <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
