import { SqlReimb } from "../dto/sql-reimb";
import { Reimb } from "../models/reimb";

export function reimbConverter(sqlReimbRow: any) {
  let sqlReimb = {
    id: sqlReimbRow.reimb_id,
    amount: sqlReimbRow.reimb_amount,
    submitted: sqlReimbRow.reimb_submitted,
    resolved: sqlReimbRow.reimb_resolved,
    description: sqlReimbRow.reimb_description,
    author: sqlReimbRow.reimb_author,
    resolver: sqlReimbRow.reimb_resolver,
    statusId: sqlReimbRow.reimb_status_id,
    typeId: sqlReimbRow.reimb_type_id
  };
  return new Reimb(
    sqlReimb.id,
    sqlReimb.amount,
    sqlReimb.submitted,
    sqlReimb.resolved,
    sqlReimb.description,
    sqlReimb.author,
    sqlReimb.resolver,
    sqlReimb.statusId,
    sqlReimb.typeId
  );
}
