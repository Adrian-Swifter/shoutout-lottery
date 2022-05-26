import React from "react";
import Header from "../components/Layout/Header";

function HowItWorks({ user, usersCount, signOut }) {
  return (
    <>
      <Header user={user} usersCount={usersCount} signOut={signOut} />
      <h3 className="main-heading">How It Works?</h3>
      <div className="hiw-content">
        <p>
          ***APP NAME*** is a website where you can win 24h promotion of your
          website URL. You can enter to win every day and only one winner will
          be chosen every 24h.
        </p>
        <ol>
          <li>
            🔧Create🔧 an account by visiting the 'Register' route in the header
            menu.
          </li>
          <li>
            Go to the Home page and then you just press 'Enter Today's Shoutout
            Pool'
          </li>
          <li>
            You are now a part of a pool of users that chose to participate in
            the next📆 shoutout lottery.
          </li>
          <li>
            When ⏲timer⏲ runs out one winner will be picked out randomly and
            their website URL and description will be shown for the next 24h.
          </li>
        </ol>
      </div>
    </>
  );
}

export default HowItWorks;
