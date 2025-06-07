import { onCall, onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { auth } from "firebase-functions/v1";
import * as admin from "firebase-admin";
admin.initializeApp()


// auth trigger (new user signup)
exports.newUserSignup = auth.user().onCreate((user) => {
    console.log("New user signed up:", user.email, user.uid);
    // to return value or promise
    return admin.firestore().collection("users").doc(user.uid).set({
        email: user.email,
        upvotedOn: [],
    });
});

// auth trigger (new user deleted)
exports.userDeleted = auth.user().onDelete((user) => {
    console.log("User Deleted:", user.email, user.uid);
    // to return value or promise
    const doc = admin.firestore().collection("users").doc(user.uid);
    return doc.delete();
});

// http request 1
exports.randomNumber = onRequest({ region: "asia-south1" }, (req, res) => {
  const number = Math.floor(Math.random() * 10);
  logger.info("Generated random number:", number);
  res.send({
    number: number,
    message: "Random number generated successfully!",
  });
});

type HelloRequest = { name: string };
type HelloResponse = string;

// http callable function 2
exports.sayHello = onCall<HelloRequest, HelloResponse>({ region: "asia-south1" }, (data, context) => {
  return `Hello, ${data.data.name}!`;
});
