import { User } from "@prisma/client";

export class UserDTO implements User {
  userId: string;
  name: string;
  email: string;
  password: string;
  roleId: number;
}

export type UserCreateDTO = Omit<UserDTO, "userId">;
export type UserUpdateDTO = Partial<UserCreateDTO>;
export type UserLoginDTO = Pick<UserDTO, "email" | "password">;
export type UserResponseDTO = Omit<UserDTO, "password">;
