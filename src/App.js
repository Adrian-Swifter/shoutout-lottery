import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./App.css";
import { auth, app } from "./firebase/firebase_config";
import useFirestore from "./hooks/useFirestore";

import firebase from "firebase/compat/app";
import loginIcon from "./assets/login 1.png";
import userIcon from "./assets/user 1.svg";
import passwordIcon from "./assets/lock 1.svg";
import moment from "moment";
import Button from "./UI/Button";
import Login from "./routes/Login";
import Register from "./routes/Register";
import TimeLeft from "./components/TimeLeft";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [randomWinner, setRandomWinner] = useState(undefined);
  const [poolEntriesIDs, setPoolEntriesIDs] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [shoutOutTime, setShoutOutTime] = useState(null);
  const [hasWonTime, setHasWonTime] = useState("");
  const users = useFirestore("users");
  const poolEntries = useFirestore("poolEntries");
  const last_winner = useFirestore("last_winner");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    setUsersCount(users.collData.length);

    last_winner.collData.forEach((element) => {
      const winnerFromUsers = users.collData.filter(
        (user) => user.id === element.last_winner
      );
      setRandomWinner(winnerFromUsers[0]);
    });

    if (user) {
      const loggedInUserHasWon = users.collData.filter((singleUser) => {
        return singleUser.id === user.uid;
      });
      setHasWonTime(loggedInUserHasWon[0]?.hasWon);
    }
  }, [users.collData, last_winner.collData]);

  useEffect(() => {
    poolEntries.collData.forEach((item) => {
      setPoolEntriesIDs(item.userIDArray);
      setShoutOutTime(item.resultDeclareTime);
    });
  }, [poolEntries.collData]);

  const logout = async () => {
    await signOut(auth);
  };

  const handleShoutoutPoolEntries = () => {
    const now = moment(new Date()); //todays date
    const end = hasWonTime; // another date
    const duration = moment.duration(now.diff(end));
    const minutes = Math.floor(duration.asMinutes());

    if (user === null) {
      alert("Please login first.");
    } else {
      if (poolEntriesIDs.includes(user.uid)) {
        alert("You have already entered today's pool.");
      } else if (hasWonTime !== null && minutes < 5) {
        alert(
          "You won " +
            minutes +
            " min ago. Please wait for " +
            (5 - minutes) +
            " min."
        );
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
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  return (
    <Router>
      <div className="App">
        <div className="error">{error}</div>
        <h3 className="main-heading">Number of users: {usersCount}</h3>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                loginIcon={loginIcon}
                userIcon={userIcon}
                passwordIcon={passwordIcon}
                setError={setError}
                signInWithEmailAndPassword={signInWithEmailAndPassword}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                createUserWithEmailAndPassword={createUserWithEmailAndPassword}
                setError={setError}
                userIcon={userIcon}
                passwordIcon={passwordIcon}
                loginIcon={loginIcon}
              />
            }
          />
        </Routes>

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
        <h3 className="main-heading"> Today's Shoutout goes to: </h3>
        {randomWinner ? (
          <>
            <div className="random-winner-link">
              <a
                href={randomWinner?.websiteURL}
                target="_blank"
                rel="noreferrer noopener"
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
          </>
        ) : (
          <p>Nothing to see here :/</p>
        )}
        <h3 className="main-heading">Next Shoutout in:</h3>
        <TimeLeft shoutOutTime={shoutOutTime} />
        <div style={{ marginBottom: "20px" }}>
          <Button
            classes="threed-btn"
            fn={handleShoutoutPoolEntries}
            title=" Enter Today's Shoutout Pool"
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
