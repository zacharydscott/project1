export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  roleID: number;

  constructor(
    id?: number,
    username?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    roleID?: number
  ) {
    id && (this.id = id);
    username && (this.username = username);
    password && (this.password = password);
    firstName && (this.firstName = firstName);
    lastName && (this.lastName = lastName);
    email && (this.email = email);
    roleID && (this.roleID = roleID);
  }
}
