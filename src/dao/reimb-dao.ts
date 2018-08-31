import { connectionPool } from "../util/connection-util";
import { User } from "../models/User";
import { Reimb } from "../models/reimb";
import { userConverter } from "../util/user-converter";
import { reimbConverter } from "../util/reimb-converter";
import { SqlReimb } from "../dto/sql-reimb";

export async function findAllReimb(accessor: User): Promise<Reimb[]> {
  if (accessor.roleID !== 1) {
    console.log("access denied");
    return null;
  }
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(`SELECT * FROM ers.ers_reimbursement`);
    const reimbs = [];
    resp.rows.forEach(sqlReimb => {
      const reimb = reimbConverter(sqlReimb);
      reimbs.push(reimb);
    });
    return reimbs;
  } finally {
    client.release();
  }
  return [];
}

export async function findReimbByID(
  accessor: User,
  id: number
): Promise<Reimb> {
  if (accessor.roleID !== 1) {
    return null;
  }
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM ers.ers_reimbursement
            WHERE reimb_id = '${id}';`
    );
    let reimb;
    resp.rows[0] && (reimb = reimbConverter(resp.rows[0]));
    return reimb;
  } finally {
    client.release();
  }
  return null;
}

export async function findReimbByUser(user: User): Promise<Reimb[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM ers.ers_reimbursement
        WHERE reimb_author = '${user.id}';`
    );
    let reimb;
    resp.rows[0] && (reimb = reimbConverter(resp.rows[0]));
    return reimb;
  } finally {
  }
  return null;
}
export async function addReimb(reimb: SqlReimb): Promise<boolean> {
  const client = await connectionPool.connect();
  try {
    await client.query(
      `INSERT INTO ers.ers_reimbursement
            (reimb_amount,reimb_submitted,reimb_resolved,reimb_description,
                reimb_author,reimb_resolver,reimb_status_id,reimb_type_id)
                VALUES (${reimb.amount},'${reimb.submitted}','${
        reimb.resolved
      }',
                    '${reimb.description}',${reimb.author},${reimb.resolver},${
        reimb.statusId
      },${reimb.typeId});`
    );
    return true;
  } finally {
    client.release();
  }
  return false;
}

export async function changeReimb(
  accessor: User,
  reimb: SqlReimb
): Promise<boolean> {
  const client = await connectionPool.connect();
  try {
    await client.query(
      `UPDATE ers.ers_reimbursement
      SET reimb_amount= ${reimb.amount}, reimb_submitted= '${
        reimb.resolved
      }', rreimb_resolved = '${reimb.resolved}',
      eimb_description= '${reimb.description}', reimb_author= ${
        reimb.author
      }, reimb_resolver= ${reimb.resolver}, 
      reimb_status_id= ${reimb.statusId}, reimb_type_id= ${reimb.typeId}
       WHERE reimb_id = ${reimb.id} `
    );
    return true;
  } catch (e) {
    console.log(e);
  } finally {
  }
  return false;
}
