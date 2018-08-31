export class Reimb {
  id: number;
  amount: number;
  submitted: string;
  resolved: string;
  description: string;
  author: number;
  resolver: number;
  statusId: number;
  typeId: number;

  constructor(
    id?: number,
    amount?: number,
    submitted?: string,
    resolved?: string,
    description?: string,
    author?: number,
    resolver?: number,
    statusId?: number,
    typeId?: number
  ) {
    id && (this.id = id);
    amount && (this.amount = amount);
    submitted && (this.submitted = submitted);
    resolved && (this.resolved = resolved);
    description && (this.description = description);
    author && (this.author = author);
    resolver && (this.resolver = resolver);
    statusId && (this.statusId = statusId);
    typeId && (this.typeId = typeId);
  }
}
