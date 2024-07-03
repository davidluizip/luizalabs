export class UserSession {
  userId: string;
  username: string;
  role: {
    id: string;
    name: string;
    correlationId: string;
    is_admin: boolean;
  };
}
