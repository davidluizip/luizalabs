export interface IUserSession {
  sub: string;
  username: string;
  role: IRoleSession;
}
export interface IRoleSession {
  id: number;
  name: string;
  is_admin: boolean;
}
