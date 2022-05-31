import React from "react";
import Header from "../components/Layout/Header";

function HowItWorks({ user, usersCount, signOut }) {
  return (
    <>
      <Header user={user} usersCount={usersCount} signOut={signOut} />
      <h3 className="main-heading">How It Works?</h3>
      <div className="hiw-content">
        <p>
          ***APP NAME*** is a website where you can win promotion or shoutout
          for your website. You can enter to win every 24h and only one winner
          will be chosen randomly when the time runs out.
        </p>
        <p>
          In the upper left corner you can see the number of registered users so
          in every moment you can see what could be the possible reach
        </p>
        <ol>
          <li>
            🔧Create🔧 an account by visiting the 'Register' route in the header
            menu.
          </li>
          <li>
            &#128273;Verify that you are the owner of the email you registered
            with by visiting the link we sent you.
          </li>
          <li>
            If there is a link that is promoted at the time you want to enter
            the pool, you will need to visit that link in order to be able to
            enter.
          </li>
          <li>Press 'Enter Today's Shoutout Pool'</li>
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
