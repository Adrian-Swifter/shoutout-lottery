import { useState } from "react";
import "./App.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import loginIcon from "./assets/login 1.png";
import userIcon from "./assets/user 1.svg";
import passwordIcon from "./assets/lock 1.svg";

import Login from "./routes/Login";
import Register from "./routes/Register";
import LandingPage from "./components/LandingPage";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [error, setError] = useState("");

  return (
    <Router>
      <div className="App">
        <div className="error">{error}</div>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                onAuthStateChanged={onAuthStateChanged}
                signOut={signOut}
                setError={setError}
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
      </div>
    </Router>
  );
}

export default App;
