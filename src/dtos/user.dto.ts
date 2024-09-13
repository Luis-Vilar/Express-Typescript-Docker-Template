import { User } from "@prisma/client";

export class UserDTO implements User {
  userId: string;
  name: string;
  email: string;
  password: string;
  roleId: number;
}

export class UserCreateDTO implements Partial<UserDTO> {
  name: string;
  email: string;
  password: string;
  roleId: number;
}

export class UserUpdateDTO implements Partial<UserDTO> {
  name?: string;
  email?: string;
  password?: string;
  roleId?: number;
}

export class UserLoginDTO {
  email: string;
  password: string;
}

export class UserResponseDTO {
  userId: string;
  name: string;
  email: string;
  roleId: number;
}