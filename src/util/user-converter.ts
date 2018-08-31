import { SqlUser } from "../dto/sql-user";
import { User } from "../models/user";

export function userConverter(sqlUserRow: any) {
  let sqlUser = {
    id: sqlUserRow.ers_user_id,
    username: sqlUserRow.ers_username,
    password: sqlUserRow.ers_password,
    firstName: sqlUserRow.user_first_name,
    lastName: sqlUserRow.user_last_name,
    email: sqlUserRow.user_email,
    roleID: sqlUserRow.user_role_id
  };

  return new User(
    sqlUser.id,
    sqlUser.username,
    sqlUser.password,
    sqlUser.firstName,
    sqlUser.lastName,
    sqlUser.email,
    sqlUser.roleID
  );
}
