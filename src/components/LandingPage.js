import React, { useState, useEffect } from "react";
import Button from "../UI/Button";
import TimeLeft from "../components/TimeLeft";
import useFirestore from "../hooks/useFirestore";
import firebase from "firebase/compat/app";
import { app, auth } from "../firebase/firebase_config";
import moment from "moment";
import Header from "./Layout/Header";
import Modal from "../UI/Modal";

function LandingPage({
  signOut,
  setError,
  user,
  usersCount,
  modalOpen,
  setModalOpen,
  setModalMessage,
  modalMessage,
}) {
  const [randomWinner, setRandomWinner] = useState(undefined);

  const [poolEntriesIDs, setPoolEntriesIDs] = useState([]);

  const [shoutOutTime, setShoutOutTime] = useState(null);
  const [hasWonTime, setHasWonTime] = useState("");
  const [hasClicked, setHasClicked] = useState(null);
  const users = useFirestore("users");
  const poolEntries = useFirestore("poolEntries");
  const last_winner = useFirestore("last_winner");

  useEffect(() => {
    last_winner.collData.forEach((element) => {
      const winnerFromUsers = users.collData.filter(
        (user) => user.id === element.last_winner
      );
      setRandomWinner(winnerFromUsers[0]);
    });

    if (user) {
      const loggedInUser = users.collData.filter((singleUser) => {
        return singleUser.id === user.uid;
      });
      setHasWonTime(loggedInUser[0]?.hasWon);
      setHasClicked(loggedInUser[0]?.hasClicked);
    }
  }, [users.collData, last_winner.collData]);
  console.log(user);
  useEffect(() => {
    poolEntries.collData.forEach((item) => {
      setPoolEntriesIDs(item.userIDArray);
      setShoutOutTime(item.resultDeclareTime);
    });
  }, [poolEntries.collData]);

  const handleShoutoutPoolEntries = async () => {
    const now = moment(new Date()); //todays date
    const end = hasWonTime; // another date
    const duration = moment.duration(now.diff(end));
    const minutes = Math.floor(duration.asMinutes());

    if (user !== null) {
      await user.reload();
      user = auth.currentUser;
    }

    if (user === null) {
      setModalMessage("Please login first.");
      setModalOpen(true);
    } else {
      if (poolEntriesIDs.includes(user.uid)) {
        setModalMessage("You have already entered today's pool.");
        setModalOpen(true);
      } else if (hasWonTime !== null && minutes < 5) {
        setModalMessage(
          "You won " +
            minutes +
            " min ago. Please wait for " +
            (5 - minutes) +
            " min."
        );
        setModalOpen(true);
      } else if (user.emailVerified === false) {
        setModalMessage(
          "You need to verify your email address in order to ented the shoutout pool"
        );
        setModalOpen(true);
      } else if (!hasClicked) {
        setModalMessage(
          "Please visit the link that is currently promoted in order to enter the pool."
        );
        setModalOpen(true);
      } else {
        try {
          app
            .firestore()
            .collection("poolEntries")
            .doc("poolEntriesData")
            .set(
              {
                userIDArray: firebase.firestore.FieldValue.arrayUnion(user.uid),
              },
              { merge: true }
            );
          setError("");
          setModalMessage("You have successfully entered today's pool.");
          setModalOpen(true);
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const handleWebsiteURLClick = () => {
    if (user !== null) {
      firebase.firestore().collection("users").doc(user.uid).update({
        hasClicked: true,
      });
    }
  };
  console.log(hasClicked);
  return (
    <>
      <Header user={user} usersCount={usersCount} signOut={signOut} />

      <h3 className="main-heading"> Today's Shoutout goes to: </h3>
      {randomWinner ? (
        <main className="main-winner-section">
          <div className="random-winner-link">
            <a
              href={randomWinner?.websiteURL}
              target="_blank"
              rel="noreferrer noopener"
              onClick={handleWebsiteURLClick}
            >
              {randomWinner?.websiteURL}
            </a>
            {randomWinner && (
              <i className="fa-solid fa-up-right-from-square"></i>
            )}
          </div>
          <p
            className="description"
            style={randomWinner && { padding: "1rem" }}
          >
            {randomWinner?.description}
          </p>
        </main>
      ) : (
        <p>No winner is picked for this round. &#129402;</p>
      )}
      <h3 className="main-heading">Next Shoutout in:</h3>
      <TimeLeft shoutOutTime={shoutOutTime} />
      <div style={{ marginBottom: "20px" }}>
        <Button
          classes="threed-btn"
          fn={handleShoutoutPoolEntries}
          title=" Enter Today's Shoutout Pool"
        />

        {modalOpen && (
          <Modal modalMessage={modalMessage} setModalOpen={setModalOpen} />
        )}
      </div>
    </>
  );
}

export default LandingPage;
