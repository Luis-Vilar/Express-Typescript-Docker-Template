import { User } from "@prisma/client";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsUUID,
} from "class-validator";

export class UserDTO implements User {
  userId: string;
  name: string;
  email: string;
  password: string;
  roleId: number;
}

export class UserCreateDTO implements Omit<UserDTO, "userId"> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  roleId: number;
}

export class UserUpdateDTO implements Partial<UserDTO> {}
export type UserLoginDTO = Pick<UserDTO, "email" | "password">;
export type UserResponseDTO = Omit<UserDTO, "password">;
