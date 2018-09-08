import express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import session from "express-session";
import { Request, Response, Router } from "express";
import { userRouter } from "./routers/user-router";
import { connectionPool } from "./util/connection-util";
import { findByName, findUserByID } from "./dao/user-dao";
import { addUser, findByUsernameAndPassword } from "./dao/user-dao";
import { User } from "./models/user";
import { SqlReimb } from "./dto/sql-reimb";
import {
  addReimb,
  findAllReimb,
  findReimbsByUser,
  findReimbByID,
  changeReimb
} from "./dao/reimb-dao";

const app = express();

const port = process.env.PORT || 3000;
app.set("port", port);

const server = app.listen(port, () => {
  console.log(
    `App is running at http://localhost:${app.get("port")} in ${app.get(
      "env"
    )} mode`
  );
});

const sess = {
  secret: "No Sceret",
  cookie: { secure: false },
  resave: false,
  saveUninitialized: false
};
if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  sess.cookie.secure = true;
}

app.use(session(sess));
app.use((req: Request, resp: Response, next) => {
  console.log(`path request: ${req.path} ; Method: ${req.method}`);
  next();
});
// use the body parser to convert request json
app.use(bodyParser.json());

// allows cors headers
app.use((req, resp, next) => {
  resp.header("Access-Control-Allow-Origin", "http://localhost:3001");
  resp.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  resp.header("Access-Control-Allow-Credentials", "true");
  next();
});
//sets path for static content such as css and
app.use("/user", userRouter);

app.use(express.static(path.join(__dirname, "public")));
