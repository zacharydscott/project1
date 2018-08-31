import express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import session from "express-session";
import { Request, Response, Router } from "express";
import { userRouter } from "./routers/user-router";
import { connectionPool } from "./util/connection-util";
import {
  findByUsernameAndPassword,
  findByName,
  findUserByID
} from "./dao/user-dao";
import { addUser } from "./dao/user-dao";
import { User } from "./models/user";
import { findReimbByUser } from "./dao/reimb-dao";
let user = new User(
  2,
  "aaa",
  "pass",
  "Aaron",
  "Adario",
  "aaadario@gmail.com",
  1
);

let reimbs = findReimbByUser(user);
console.log(user.id);
setTimeout(() => {
  console.log(reimbs);
}, 500);
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
app.use(bodyParser.json());
//sets path for static content such as css and
app.use("/user", userRouter);

app.use(express.static(path.join(__dirname, "public")));
console.log(reimbs);
