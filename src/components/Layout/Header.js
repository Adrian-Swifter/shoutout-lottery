import React from "react";
import { auth } from "../../firebase/firebase_config";
import { Link } from "react-router-dom";

function Header({ user, usersCount, signOut }) {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <header>
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
        </ul>
      </nav>

      {user && (
        <div className="logged-user">
          <p>
            <i className="fa-solid fa-user"></i>
            <span>{user?.email}</span>
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
