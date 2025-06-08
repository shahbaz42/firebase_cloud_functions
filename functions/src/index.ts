import { HttpsError, onCall, onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
admin.initializeApp();

// auth trigger (new user signup)
exports.newUserSignup = functions
  .region("asia-south1")
  .auth.user()
  .onCreate((user) => {
    console.log("New user signed up:", user.email, user.uid);
    // to return value or promise
    return admin.firestore().collection("users").doc(user.uid).set({
      email: user.email,
      upvotedOn: [],
    });
  });

// auth trigger (new user deleted)
exports.userDeleted = functions
  .region("asia-south1")
  .auth.user()
  .onDelete((user) => {
    console.log("User Deleted:", user.email, user.uid);
    // to return value or promise
    const doc = admin.firestore().collection("users").doc(user.uid);
    return doc.delete();
  });

// http callable function (adding a request)
exports.addRequest = onCall({ region: "asia-south1" }, async (req) => {
  if (!req.auth) {
    throw new HttpsError(
      "unauthenticated",
      "Only authenticated users can add requests."
    );
  }
  if (req.data.text.length < 3) {
    throw new HttpsError(
      "invalid-argument",
      "Request text must be at least 3 characters long."
    );
  }

  try {
    const result = await admin.firestore().collection("request").add({
      text: req.data.text,
      upvotes: 0,
    });

    return {
      id: result.id,
      message: "Request added successfully!",
    };
  } catch (error) {
    logger.error("Error adding request:", error);
    throw new HttpsError(
      "internal",
      "Something went wrong while adding the request."
    );
  }
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

// type HelloRequest = { name: string };
// type HelloResponse = string;

// // http callable function 2
// exports.sayHello = onCall<HelloRequest, HelloResponse>(
//   { region: "asia-south1" },
//   (data, context) => {
//     return `Hello, ${data.data.name}!`;
//   }
// );
