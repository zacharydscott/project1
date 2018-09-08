import { Request, Response } from "express";
import express from "express";
import * as userDao from "../dao/user-dao";
import { User } from "../models/User";
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

userRouter.post("/register", async (req, resp) => {
  let newUser;
  console.log("newUser");
  try {
    newUser = new User(
      req.body.id,
      req.body.username,
      req.body.password,
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.roleID
    );
  } catch (err) {
    resp.sendStatus(400);
  } finally {
  }
  try {
    console.log(newUser);
    const added = await userDao.addUser(newUser);
    console.log(added);
    if (added) {
      resp.sendStatus(201);
    } else {
      resp.sendStatus(403);
    }
  } catch (err) {
    resp.sendStatus(500);
  }
});
