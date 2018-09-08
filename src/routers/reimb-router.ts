import { Request, Response } from "express";
import express from "express";
import * as ReimbDao from "../dao/reimb-dao";
import * as userDao from "../dao/user-dao";
import { User } from "../models/User";
import { Reimb } from "../models/reimb";
export const reimbRouter = express.Router();
import { SqlReimb } from "../dto/sql-reimb";

reimbRouter.get("/all", async (req, resp) => {
  console.log("grabbing all reimbursements");
  try {
    const reimbs = await ReimbDao.findAllReimb();
    console.log(`Successful retrieval, ${reimbs.length} entries found.`);
    resp.json(reimbs);
  } catch (err) {
    resp.sendStatus(500);
  }
});

reimbRouter.get("/:id", async (req, resp) => {
  console.log(`Retrieving all reimbs for user with id: ${+req.params.id} `);
  try {
    const reimbs = await ReimbDao.findReimbsByUserID(+req.params.id);
    if (reimbs[0]) {
      resp.json(reimbs);
    } else {
      resp.sendStatus(404);
    }
  } catch (err) {
    resp.sendStatus(500);
  }
});

reimbRouter.post("/", async (req, resp) => {
  let newReimb;
  console.log("adding new user");
  console.log(req.body);
  try {
    newReimb = new SqlReimb(
      null,
      req.body.amount,
      null,
      null,
      req.body.description,
      req.body.author,
      null,
      1,
      req.body.typeId
    );
  } catch (err) {
    resp.sendStatus(400);
  }
  try {
    const added = await ReimbDao.addReimb(newReimb);
    if (added) {
      resp.sendStatus(201);
    } else {
      resp.sendStatus(403);
    }
  } catch (err) {
    resp.sendStatus(500);
  }
});

reimbRouter.patch("/:id", async (req, resp) => {
  let alteredReimb;
  const resolver = +req.params.id;
  try {
    alteredReimb = new SqlReimb(
      req.body.id,
      req.body.amount,
      null,
      null,
      req.body.description,
      req.body.author,
      resolver,
      req.body.statusId,
      req.body.typeId
    );
  } catch (err) {
    resp.sendStatus(400);
  }
  try {
    console.log(alteredReimb);
    const added = await ReimbDao.changeReimb(alteredReimb);
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
