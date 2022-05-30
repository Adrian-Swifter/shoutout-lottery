import React, { useState, useEffect } from "react";
import Header from "../components/Layout/Header";

function UserProfile({ user, usersCount, signOut, users }) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const currU = users.collData.filter((cUser) => {
      return cUser.id === user.uid;
    });

    setCurrentUser(currU[0]);
  }, [users.collData]);
  console.log(currentUser);
  return (
    <div>
      <Header user={user} usersCount={usersCount} signOut={signOut} />
      <h3 className="main-heading">User Profile</h3>
      <div className="random-winner-link">
        <a
          href={currentUser?.websiteURL}
          target="_blank"
          rel="noreferrer noopener"
        >
          {currentUser?.websiteURL}
        </a>
        {currentUser && <i className="fa-solid fa-up-right-from-square"></i>}
      </div>
      <p className="description" style={currentUser && { padding: "1rem" }}>
        {currentUser?.description}
      </p>
    </div>
  );
}

export default UserProfile;
