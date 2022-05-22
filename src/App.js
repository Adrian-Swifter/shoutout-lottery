import { useState, useEffect } from "react";
import { auth } from "./firebase/firebase_config";
import "./App.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import useFirestore from "./hooks/useFirestore";

import loginIcon from "./assets/login 1.png";
import userIcon from "./assets/user 1.svg";
import passwordIcon from "./assets/lock 1.svg";

import Login from "./routes/Login";
import Register from "./routes/Register";
import LandingPage from "./components/LandingPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [usersCount, setUsersCount] = useState(0);
  const users = useFirestore("users");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    setUsersCount(users.collData.length);
  }, [users.collData]);

  return (
    <Router>
      <div className="App">
        <div className="error">{error}</div>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                signOut={signOut}
                setError={setError}
                user={user}
                usersCount={usersCount}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                loginIcon={loginIcon}
                userIcon={userIcon}
                passwordIcon={passwordIcon}
                setError={setError}
                signInWithEmailAndPassword={signInWithEmailAndPassword}
                user={user}
                usersCount={usersCount}
                signOut={signOut}
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
                user={user}
                usersCount={usersCount}
                signOut={signOut}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
