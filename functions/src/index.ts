import { HttpsError, onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
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

// upvote callable function
exports.upvote = onCall({ region: "asia-south1" }, async (req) => {
  if (!req.auth) {
    throw new HttpsError(
      "unauthenticated",
      "Only authenticated users can add requests."
    );
  }

  // get ref for userDoc and request doc
  const user = await admin.firestore().collection("users").doc(req.auth.uid);
  const request = await admin
    .firestore()
    .collection("request")
    .doc(req.data.id);

  const userDoc = await user.get();
  const userData = userDoc.data();

  if (!userData) {
    throw new HttpsError("not-found", "User data not found.");
  }

  if (userData.upvotedOn.includes(req.data.id)) {
    throw new HttpsError(
      "failed-precondition",
      "You have already upvoted this request."
    );
  }

  // update user array
  await user.update({
    upvotedOn: [...userData.upvotedOn, req.data.id],
  });

  // update request upvotes
  await request.update({
    upvotes: FieldValue.increment(1),
  });

  return {
    message: "Upvote successful!",
  };
});
