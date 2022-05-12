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
import pickRandomWinner from "./utils/pickRandomWinner";
import firebase from "firebase/compat/app";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [randomWinner, setRandomWinner] = useState({});
  const [poolEntriesIDs, setPoolEntriesIDs] = useState([]);
  const [usersCount, setUsersCount] = useState(0);

  const users = useFirestore("users");
  const poolEntries = useFirestore("poolEntries");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    const intervalID = setInterval(() => {
      const randomUserID = pickRandomWinner(poolEntriesIDs);
      const randomWinnerArr = users.collData.filter(
        (user) => user.id == randomUserID
      );
      setRandomWinner(randomWinnerArr[0]);
      console.log(randomUserID);
      poolEntriesIDs.forEach((id) => {
        app
          .firestore()
          .collection("poolEntries")
          .doc("poolEntriesData")
          .update({
            userIDArray: firebase.firestore.FieldValue.arrayRemove(id),
          });
      });
    }, 30000);

    setUsersCount(users.collData.length);

    return () => clearInterval(intervalID);
  }, [users.collData, poolEntriesIDs]);

  useEffect(() => {
    poolEntries.collData.forEach((item) => setPoolEntriesIDs(item.userIDArray));
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
    if (user === null) {
      alert("Please login first.");
    } else {
      if (poolEntriesIDs.includes(user.uid)) {
        alert("You have already entered today's pool.");
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
      <h3>Number of users: {usersCount}</h3>
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          type="email"
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
          value={registerEmail}
          required
        />
        <input
          placeholder="Password..."
          type="password"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
          value={registerPassword}
          required
        />

        <input
          type="text"
          placeholder="Website URL"
          onChange={(event) => {
            setWebsiteURL(event.target.value);
          }}
          value={websiteURL}
          required
        />

        <textarea
          type="text"
          placeholder="Description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          value={description}
        ></textarea>

        <button onClick={register} disabled={user?.email}>
          Create User
        </button>
      </div>
      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          type="email"
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
          value={loginEmail}
        />
        <input
          placeholder="Password..."
          type="password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
          value={loginPassword}
        />

        <button onClick={login} disabled={user?.email}>
          Login
        </button>
      </div>
      {user && <h4> User Logged In: </h4>}
      {user?.email}
      <div>{user && <button onClick={logout}> Sign Out </button>}</div>
      <h4> Today's Shoutout goes to: </h4>
      <p>{randomWinner?.websiteURL}</p>
      <p>{randomWinner?.description}</p>
      <div>
        <button onClick={handleShoutoutPoolEntries}>
          Enter Today's Shoutout Pool
        </button>
      </div>
    </div>
  );
}

export default App;
