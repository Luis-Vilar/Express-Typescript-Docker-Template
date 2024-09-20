import { $Enums } from "@prisma/client";
import { Request, Response } from "express";
import { UserCreateDTO, UserUpdateDTO } from "../dtos/user.dto";
import { errorHandler } from "../services/error.services";
import { generateToken } from "../services/jwt.services";
import { getRoleId } from "../services/rbac.services";
import {
  createUser,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUser,
} from "../services/user.services";
import { RequestWithUser } from "../types";
import { compareSecret, hashSecret } from "../utils/bcrypt";

export const getAllUsers = async (req: Request, res: Response) => {
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
      statusCode: 200,
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
    delete user.password;
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const updateOneUser = async (req: RequestWithUser, res: Response) => {
  try {
    const { userId } = req.params;
    const loggedUser = req.user;
    if (loggedUser.sub !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this user" });
    }
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userUpdateDto: UserUpdateDTO = req.body;
    const updatedUser = await updateUser(userId, userUpdateDto);
    delete updatedUser.password;
    res.status(200).json({
      message: `User whit id ${userId} has updated`,
      changes: userUpdateDto,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
