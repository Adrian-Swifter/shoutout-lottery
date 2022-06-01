const express = require("express");
const firebase = require("firebase-admin");
const serviceAccount = require("./shoutout-efa62-firebase-adminsdk-2xcbz-44d6796157.json");
const moment = require("moment");
const app = express();
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  storageBucket: "shoutout-efa62.appspot.com",
});

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
  } else {
    console.log(
      "Waiting for Result Time : ",
      moment.utc(nextPoolEndTime).local().format("YYYY-MM-DD hh:mm:ss")
    );
  }
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
        hasClicked: false,
      });
  }
}
app.listen(5000, () => console.log("Server is listening to 5000"));
