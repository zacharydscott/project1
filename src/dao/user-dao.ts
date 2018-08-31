import { connectionPool } from "../util/connection-util";
import { User } from "../models/User";
import { userConverter } from "../util/user-converter";

export async function findAllUsers(): Promise<User[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(`SELECT * FROM ers.ers_users`);
    const users = [];
    resp.rows.forEach(sqlUser => {
      const user = userConverter(sqlUser);
      users.push(user);
    });
    return users;
  } finally {
    client.release();
  }
}

export async function findUserByID(id: number): Promise<User> {
  const client = await connectionPool.connect();
  try {
    console.log(`retrieving user with id ${id}`);
    const respBody = await client.query(
      `select * from ers.ers_users
      where ers_user_id = ${id};`
    );

    if (respBody.rows.length !== 0) {
      const user = userConverter(respBody.rows[0]);
      console.log(`found user ${typeof respBody.rows[0]}`);
      console.log(user);
      return user;
    }
    return null;
  } finally {
    client.release();
  }
}
export async function findByUsernameAndPassword(
  username: string,
  password: string
): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const respBody = await client.query(
      `SELECT * FROM ers.ers_users
                where ers_username = '${username}' 
                and ers_password = '${password}'`
    );
    if (respBody.rows.length !== 0) {
      const user = userConverter(respBody.rows[0]);
      return user;
    }
    return null;
  } finally {
    client.release();
  }
}

export async function findByName(
  firstName: string,
  lastName: string
): Promise<User[]> {
  const client = await connectionPool.connect();
  try {
    const respBody = await client.query(
      `SELECT * FROM ers.ers_users
        where user_first_name = '${firstName}'
        and user_last_name = '${lastName}';`
    );
    if (respBody.rows.length !== 0) {
      const users = [];
      respBody.rows.forEach(sqlUser => {
        const user = userConverter(sqlUser);
        users.push(user);
      });
      console.log(users);
      return users;
    }
  } finally {
    client.release();
  }
}
export async function addUser(user: User): Promise<boolean> {
  const client = await connectionPool.connect();
  try {
    await client.query(
      `INSERT INTO ers.ers_users
        (ers_username,ers_password,user_first_name,user_last_name,user_email,user_role_id)
            VALUES ('${user.username}','${user.password}','${user.firstName}',
            '${user.lastName}','${user.email}','${user.roleID}');`
    );
    return true;
  } finally {
    client.release();
  }
  return false;
}
