import { onCall, onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

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
