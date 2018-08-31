import { addUser, findByUsernameAndPassword } from "../dao/user-dao";
import { User } from "../models/user";
let user = new User(
  null,
  "aaa",
  "pass",
  "Aaron",
  "Adario",
  "aaadario@gmail.com",
  1
);
addUser(user);
