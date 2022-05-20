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

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [description, setDescription] = useState("");
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

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      app.firestore().collection("users").doc(user.user.uid).set({
        websiteURL,
        description,
        hasWon: null,
      });
      setError("");
      setRegisterEmail("");
      setRegisterPassword("");
      setWebsiteURL("");
      setDescription("");
    } catch (error) {
      setError(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setError("");
      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      setError(error.message);
    }
  };

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
    <div className="App">
      <div className="error">{error}</div>
      <h3 className="main-heading">Number of users: {usersCount}</h3>
      <div className="form">
        <img src={loginIcon} alt="Lock and User Icon" />
        <h3 className="main-heading"> Register User </h3>
        <p>Create a new account</p>
        <p className="input-w-icon">
          <img src={userIcon} alt="User Icon" />
          <input
            placeholder="Email..."
            type="email"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
            value={registerEmail}
            required
          />
        </p>
        <p className="input-w-icon">
          <img src={userIcon} alt="User Icon" />
          <input
            placeholder="Password..."
            type="password"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
            value={registerPassword}
            required
          />
        </p>
        <p className="input-w-icon">
          <input
            type="text"
            placeholder="Website URL"
            onChange={(event) => {
              setWebsiteURL(event.target.value);
            }}
            value={websiteURL}
            required
          />
        </p>

        <textarea
          type="text"
          placeholder="Description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          value={description}
        ></textarea>

        <Button classes="btn primary-btn" fn={register} title="Create User" />
        <p>Already have an account?</p>

        <Button
          classes="btn secondary-btn"
          title="Login into existing account"
        />
      </div>
      <div className="form">
        <img src={loginIcon} alt="Lock and User Icon" />
        <h3 className="main-heading"> Login </h3>
        <p>Sign in to your account</p>
        <p className="input-w-icon">
          <img src={userIcon} alt="User Icon" />
          <input
            placeholder="Email..."
            type="email"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
            value={loginEmail}
          />
        </p>
        <p className="input-w-icon">
          <img src={passwordIcon} alt="Lock Icon" />
          <input
            placeholder="Password..."
            type="password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
            value={loginPassword}
          />
        </p>
        <Button classes="btn primary-btn" fn={login} title="Login" />
        <p>Forgot your pasword? Click here to reset.</p>

        <Button classes="btn secondary-btn" title="Register New Account" />
      </div>
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
  );
}

const TimeLeft = ({ shoutOutTime }) => {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    forceUpdate();
  }, [shoutOutTime]);

  const calculateTimeLeft = () => {
    const difference =
      new Date(
        moment.utc(shoutOutTime).local().format("YYYY-MM-DD HH:mm:ss")
      ).getTime() - new Date().getTime();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, index) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={index}>
        <span className="interval-number">
          {timeLeft[interval].toString().length > 1 ? (
            <>
              <span className="timer-number">
                {timeLeft[interval].toString().split("")[0]}
              </span>
              <span className="timer-number">
                {timeLeft[interval].toString().split("")[1]}
              </span>
            </>
          ) : (
            <>
              <span className="timer-number">0</span>
              <span className="timer-number">{timeLeft[interval]}</span>
            </>
          )}
        </span>
        <span className="interval-sign">{interval}</span>
      </span>
    );
  });
  return (
    <>
      <span className="timer-wrapper">
        {timerComponents.length > 0 ? timerComponents : "0 min"}{" "}
      </span>
    </>
  );
};

export default App;
