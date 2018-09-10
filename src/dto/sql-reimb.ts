export class SqlReimb {
  id: number;
  amount: number;
  submitted: Date;
  resolved: Date;
  description: string;
  author: number;
  resolver: number;
  statusId: number;
  typeId: number;
  constructor(
    id?: number,
    amount?: number,
    submitted?: Date,
    resolved?: Date,
    description?: string,
    author?: number,
    resolver?: number,
    statusId?: number,
    typeId?: number
  ) {
    if (id !== undefined) {
      this.id = id;
    }
    amount && (this.amount = amount);
    submitted && (this.submitted = submitted);
    resolved && (this.resolved = resolved);
    description && (this.description = description);
    author && (this.author = author);
    resolver && (this.resolver = resolver);
    if (statusId !== undefined) {
      this.statusId = statusId;
    } else {
      this.statusId = 1;
    }
    if (typeId !== undefined) {
      this.typeId = typeId;
    } else {
      this.typeId = 1;
    }
  }
}
