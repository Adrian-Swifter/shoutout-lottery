import React from "react";
import { auth } from "../../firebase/firebase_config";

function Header({ user, usersCount, signOut }) {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <h3 className="main-heading">Number of users: {usersCount}</h3>
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
