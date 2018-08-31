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

userRouter.post("/login", async (req, resp) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(req.body);
  try {
    const user = await userDao.findByUsernameAndPassword(username, password);
    console.log(user);
    if (user) {
      resp.json(user);
    } else {
      resp.sendStatus(404);
    }
  } catch (err) {
    resp.sendStatus(500);
  }
});
