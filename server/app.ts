import { json, urlencoded } from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as socket_io from "socket.io";
import * as path from "path";
import * as twitter from "twitter";

import { feedRouter } from "./routes/feed";
import { publicRouter } from "./routes/public";
import { userRouter } from "./routes/user";
import { streamRouter } from "./routes/stream";

import { twitterConfig } from "./config";

const app: express.Application = express();

// Load Socket.io object
var io = socket_io();
app.io = io;

app.disable("x-powered-by");

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

// Twitter API
let twitterConnection = new twitter({
  access_token_key: twitterConfig.access_token_key,
  access_token_secret: twitterConfig.access_token_secret,
  consumer_key: twitterConfig.consumer_key,
  consumer_secret: twitterConfig.consumer_secret,
});

// Register for global use the Socket.io and Twitter objects
app.use(function (req, res, next) {
  res.io = io;
  res.twitterConnection = twitterConnection;
  res.test = "test";
  next();
});

// api routes
app.use("/api/public", publicRouter);
app.use("/api/feed", feedRouter);
app.use("/api/user", userRouter);
app.use("/stream", streamRouter);

// stream routes



if (app.get("env") === "production") {
  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, "/../client")));
}

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next) => {
  const err = new Error("Not Found");
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message,
  });
});

// Socket.io event
io.on("connection", function (socket) {
  console.log("A user connceted to socket.");
});

export { app };
