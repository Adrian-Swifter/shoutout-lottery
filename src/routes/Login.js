import { useState } from "react";
import Button from "../UI/Button";
import { auth } from "../firebase/firebase_config";
import { Link } from "react-router-dom";

function Login({
  loginIcon,
  userIcon,
  passwordIcon,
  setError,
  signInWithEmailAndPassword,
}) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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
  return (
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

      <Link to="/register">
        <Button classes="btn secondary-btn" title="Register New Account" />
      </Link>
    </div>
  );
}

export default Login;
