import { useState } from "react";
import Button from "../UI/Button";
import { auth } from "../firebase/firebase_config";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";

function Login({
  loginIcon,
  userIcon,
  passwordIcon,
  setError,
  signInWithEmailAndPassword,
  user,
  usersCount,
  signOut,
  sendPasswordResetEmail,
  setModalMessage,
  setModalOpen,
}) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

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
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePasswordReset = async () => {
    await sendPasswordResetEmail(auth, loginEmail)
      .then(() => {
        setModalMessage(
          "Please check your email for password reset instructions."
        );
        setModalOpen(true);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <Header user={user} usersCount={usersCount} signOut={signOut} />
      {user ? (
        <h1>You are logged in. 😎</h1>
      ) : (
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
          <p>
            Forgot your pasword?{" "}
            <Button
              classes="btn"
              fn={handlePasswordReset}
              title="Click here to reset"
            />
            .
          </p>

          <Link to="/register">
            <Button classes="btn secondary-btn" title="Register New Account" />
          </Link>
        </div>
      )}
    </>
  );
}

export default Login;
