const express = require("express");
require("dotenv").config();
const firebase = require("firebase-admin");
const moment = require("moment");
const app = express();
const path = require("node:path");
const secure = require("ssl-express-www");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});

app.use(secure);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

firebase.initializeApp({
  credential: firebase.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  }),
  storageBucket: "shoutout-efa62.appspot.com",
});
console.log(process.env);
let poolEntriesDataArr = [];
let users = [];
let nextPoolEndTime = null;

// eventlisner for poolEnters and declare time collections
firebase
  .firestore()
  .collection("poolEntries")
  .onSnapshot((snap) => {
    snap.forEach((item) => {
      // console.log(item.data())
      poolEntriesDataArr = item.data().userIDArray;
      nextPoolEndTime = item.data().resultDeclareTime;
    });
  });

// eventlisner for users collections
firebase
  .firestore()
  .collection("users")
  .onSnapshot((snap) => {
    snap.forEach((item) => {
      users.push({ ...item.data(), id: item.id });
    });
    // console.log(users)
  });

const pickRandomWinner = (collectionData) => {
  return collectionData[Math.floor(Math.random() * collectionData.length)];
};

// cron job every 5 second
setInterval(async () => {
  // check if the result time has arrived or not
  if (
    moment.utc(nextPoolEndTime).local().format("YYYY-MM-DD hh:mm:ss") <
    moment().local().format("YYYY-MM-DD hh:mm:ss")
  ) {
    const randomUserID = pickRandomWinner(poolEntriesDataArr);
    if (randomUserID) {
      console.log("Winner of the day", randomUserID);
      //sending last winner to startpool
      startPoll(randomUserID);
    } else {
      console.log(
        "No user in the pool- Clearing the last winner & Staring new pool"
      );
      // No last winner
      startPoll("");
    }
  }
  // else {
  //   console.log(
  //     "Waiting for Result Time : ",
  //     moment.utc(nextPoolEndTime).local().format("YYYY-MM-DD hh:mm:ss")
  //   );
  // }
}, 1000);

function startPoll(last_winner) {
  // Clearing the pool Array and Incrementing Time
  firebase
    .firestore()
    .collection("poolEntries")
    .doc("poolEntriesData")
    .update({
      userIDArray: [],
      resultDeclareTime: moment()
        .add(1440, "m")
        .utc()
        .format("YYYY-MM-DD HH:mm:ss"),
    });
  // Setting the last winner if there is any
  firebase.firestore().collection("last_winner").doc("last_winner").update({
    last_winner,
  });
  if (last_winner) {
    firebase
      .firestore()
      .collection("users")
      .doc(last_winner)
      .update({
        hasWon: moment().format("YYYY-MM-DD HH:mm:ss"),
      });

    // Query Firestore to get the winner's email
    const winnerRef = firebase.firestore().collection("users").doc(last_winner);
    
    winnerRef.get()
      .then((doc) => {
        if (doc.exists) {
          const winnerEmail = doc.data().email;

          // Send an email to the winner
          const mailOptions = {
            from: "contact@milosdraskovic.com", // Replace with your verified sender email from SendGrid
            to: winnerEmail,
            subject: "Congratulations! You are the winner",
            text: "You have won the shoutout. Your website will be on display for the next 24 hours!",
          };

          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.error("Error sending email: " + error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        } else {
          console.error("Winner's document not found in Firestore");
        }
      })
      .catch((error) => {
        console.error("Error fetching winner's document:", error);
      });
  }

    firebase
      .firestore()
      .collection("users")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            hasClicked: false,
          });
        });
      });
  }
}
app.listen(process.env.PORT || 80, () => console.log("Server started."));
