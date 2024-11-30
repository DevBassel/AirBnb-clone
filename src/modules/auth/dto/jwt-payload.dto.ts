import { UserRole } from "src/modules/users/enums/user.roles";

export interface JwtPlayload {
  sub: number;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}
