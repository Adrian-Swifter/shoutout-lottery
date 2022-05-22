import React from "react";
import { auth } from "../../firebase/firebase_config";
import { Link } from "react-router-dom";

function Header({ user, usersCount, signOut }) {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <header>
      <p>
        <i class="fa-solid fa-users"></i> <span>{usersCount}</span>
      </p>
      <nav>
        <ul>
          <li>
            <i class="fa-solid fa-house"></i>
            <Link to="/">Home</Link>
          </li>
          <li>
            <i class="fa-solid fa-right-to-bracket"></i>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <i class="fa-solid fa-user-plus"></i>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
      <div>
        {user && (
          <>
            <p>
              <i class="fa-solid fa-user"></i>
              <span>{user?.email}</span>
            </p>

            <button className="btn secondary-btn" onClick={logout}>
              Sign Out <i class="fa-solid fa-right-from-bracket"></i>
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
