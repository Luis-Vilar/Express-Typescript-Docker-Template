import { UserCreateDTO, UserDTO, UserResponseDTO, UserUpdateDTO } from "../dtos/user.dto";
import prisma from "./prisma.service";

export async function createUser(data: UserCreateDTO): Promise<UserDTO> {
  return await prisma.user.create({
    data,
  });
}
export async function updateUser(userId: string, data: UserUpdateDTO): Promise<UserDTO> {
  return await prisma.user.update({
    where: {
      userId,
    },
    data,
  });
}
export async function deleteUser(userId: string): Promise<UserDTO> {
  return await prisma.user.delete({
    where: {
      userId,
    },
  });
}

export async function getUsers(): Promise<UserResponseDTO[]> {
  const users = await prisma.user.findMany({
    select: {
      userId: true,
      name: true,
      email: true,
      roleId: true,
      password: false,
    },
  });
  return users;
}

export async function getUserByEmail(email: string): Promise<UserDTO | null> {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async  function getUsersByName (name: string): Promise<UserResponseDTO[]> {
  return await prisma.user.findMany({
    select:{
      userId: true,
      name: true,
      email: true,
      roleId: true,
      password : false,
    },
    where: {
      name: {
        contains: name,
      },
    },
  });
}

export async function getUserById(userId: string): Promise<UserResponseDTO | null> {
  return await prisma.user.findUnique({
    where: {
      userId,
    },
    select: {
      userId: true,
      name: true,
      email: true,
      roleId: true,
    },
  });
}