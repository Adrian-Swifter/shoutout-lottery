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

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const users = useFirestore("users");
  useEffect(() => {
    setRandomWinner(pickRandomWinner(users.collData));
  }, [users.collData]);

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
      console.log(user);
      setError("");
      setRegisterEmail("");
      setRegisterPassword("");
    } catch (error) {
      console.log(error.message);
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
      console.log(user);
      setError("");
      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };
  console.log(randomWinner);
  return (
    <div className="App">
      <div className="error">{error}</div>
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          type="email"
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
          value={registerEmail}
          disabled={user?.email}
        />
        <input
          placeholder="Password..."
          type="password"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
          value={registerPassword}
          disabled={user?.email}
        />

        <input
          type="text"
          placeholder="Website URL"
          onChange={(event) => {
            setWebsiteURL(event.target.value);
          }}
          value={websiteURL}
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
          disabled={user?.email}
        />
        <input
          placeholder="Password..."
          type="password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
          value={loginPassword}
          disabled={user?.email}
        />

        <button onClick={login} disabled={user?.email}>
          Login
        </button>
      </div>
      <h4> User Logged In: </h4>
      {user?.email}
      <button onClick={logout}> Sign Out </button>
      <h4> Random Winner: </h4>
      <p>{randomWinner?.websiteURL}</p>
      <p>{randomWinner?.description}</p>
    </div>
  );
}

export default App;
