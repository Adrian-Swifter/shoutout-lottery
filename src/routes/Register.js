import { useState } from "react";
import Button from "../UI/Button";
import { auth, app } from "../firebase/firebase_config";
import { Link } from "react-router-dom";
import Header from "../components/Layout/Header";
import Modal from "../UI/Modal";

function Register({
  createUserWithEmailAndPassword,
  setError,
  loginIcon,
  userIcon,
  passwordIcon,
  user,
  usersCount,
  signOut,
  sendEmailVerification,
  setModalOpen,
  setModalMessage,
  modalOpen,
  modalMessage,
}) {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [description, setDescription] = useState("");

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

      sendEmailVerification(user.user).then(() => {
        setModalMessage(
          "You will need to verify your email address in order to enter the shoutout pool!"
        );
        setModalOpen(true);
      });
    } catch (error) {
      setModalMessage(error.message);
      setModalOpen(true);
    }
  };

  return (
    <>
      <Header user={user} usersCount={usersCount} signOut={signOut} />
      {user ? (
        <h1>You are logged in. 😎</h1>
      ) : (
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
            <img src={passwordIcon} alt="User Icon" />
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

          <Link to="/login">
            <Button
              classes="btn secondary-btn"
              title="Login into existing account"
            />
          </Link>
        </div>
      )}

      {modalOpen && (
        <Modal modalMessage={modalMessage} setModalOpen={setModalOpen} />
      )}
    </>
  );
}

export default Register;
