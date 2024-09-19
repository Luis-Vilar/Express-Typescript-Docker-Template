import { Request, Response } from "express";
import {
  getUserByEmail,
  getUsers,
  createUser,
} from "../services/user.services";
import { getRoleId } from "../services/rbac.services";

import { hashSecret, compareSecret } from "../utils/bcrypt";
import { generateToken } from "../services/jwt.services";
import { $Enums } from "@prisma/client";
import { errorHandler } from "../services/error.services";
import { UserCreateDTO } from "../dtos/user.dto";

export const getAllUsers = async (req: any, res: Response) => {
  const users = await getUsers();
  users?.length > 0
    ? res.status(200).json(users)
    : res.status(404).json({ message: "No users found" });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await getUserByEmail(email);

  if (user && compareSecret(password, user.password)) {
    const payload = {
      sub: user.userId,
      roleId: user.roleId,
      name: user.name,
    };
    const token = generateToken(payload);
    res.status(200).json({
      message: "Login successful",
      token,
      status: 200,
    });
  } else {
    res.status(404).json({ message: "Invalid email or password" });
  }
};

export const createNewUser = async (req: Request, res: Response) => {
  const { email, password, name }: UserCreateDTO = req.body;
  const roleId = await getRoleId($Enums.Role.USER);
  const hashedPassword = hashSecret(password);
  try {
    const user = await createUser({
      email,
      password: hashedPassword,
      name,
      roleId,
    });
    delete user.password
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    errorHandler(error, res);
  }
};
