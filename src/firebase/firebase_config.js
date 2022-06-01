// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWMuycStfSVj8qPfNrdDpkUfSafSiZzXw",
  authDomain: "shoutout-efa62.firebaseapp.com",
  databaseURL: "https://shoutout-efa62.firebaseio.com/",
  projectId: "shoutout-efa62",
  storageBucket: "shoutout-efa62.appspot.com",
  messagingSenderId: "266020996624",
  appId: "1:266020996624:web:f2b919126941dbee712c95",
  measurementId: "G-FSF2SMBNLF",
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);