import React from "react";
import { auth } from "../../firebase/firebase_config";
import { Link } from "react-router-dom";

function Header({ user, usersCount, signOut }) {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <h3 className="main-heading">Number of users: {usersCount}</h3>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>

      {user && <h3 className="main-heading"> User Logged In: </h3>}
      {user?.email}
      <div>
        {user && (
          <button className="btn secondary-btn" onClick={logout}>
            {" "}
            Sign Out{" "}
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
