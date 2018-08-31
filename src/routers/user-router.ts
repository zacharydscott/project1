import { Request, Response } from "express";
import express from "express";
import * as userDao from "../dao/user-dao";
export const userRouter = express.Router();

userRouter.get("/:id", async (req, resp) => {
  const id = +req.params.id;
  console.log(`retrieving user with id ${id}`);
  try {
    let user = await userDao.findUserByID(id);
    if (user !== undefined) {
      resp.json(user);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    resp.sendStatus(500);
  }
});
userRouter.get("/", async (req, resp) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const users = userDao.findByUsernameAndPassword(username, password);
    if (users[0]) {
      resp.json(users);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    resp.sendStatus(500);
  }
});
