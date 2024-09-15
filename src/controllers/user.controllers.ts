import { Request, Response } from "express";
import {
  getUserByEmail,
  getUsers,
  createUser,
} from "../services/user.services";
import { getRoleId } from "../services/rbac.services";

import { hashSecret, compareSecret } from "../utils/bcrypt";
import {generateToken} from '../services/jwt.services'
import { $Enums } from "@prisma/client";


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
    //todo : implement password hashing and jwt
    const payload ={
      sub : user.userId,
      roleId : user.roleId,
      name : user.name
    }
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
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }
    const roleId = await getRoleId("GUEST"); 
    //todo : implement role assignment
    //todo : implement email validation
    const newUser = await createUser({
      name,
      email,
      password: hashSecret(password),
      roleId,
    });
    newUser && res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
