import { Reimb } from "../models/reimb";
import { SqlReimb } from "../dto/sql-reimb";
export function reimbSqlConverter(reimb: Reimb) {
  if (reimb.id !== undefined) {
    let sqlReimb = new SqlReimb(
      reimb.id,
      reimb.amount,
      null,
      null,
      reimb.description,
      reimb.author,
      reimb.resolver,
      reimb.statusId,
      reimb.typeId
    );
    return sqlReimb;
  } else {
    let sqlReimb = new SqlReimb(
      null,
      reimb.amount,
      null,
      null,
      reimb.description,
      reimb.author,
      reimb.resolver,
      reimb.statusId,
      reimb.typeId
    );
    return sqlReimb;
  }
}
