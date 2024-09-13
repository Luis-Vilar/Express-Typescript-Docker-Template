import { Request, Response } from "express";
import {
  getUserByEmail,
  getUsers,
  createUser,
} from "../services/user.services";

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

  if (user && user.password === password) {
    //todo : implement password hashing and jwt
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "Invalid email or password" });
  }
};

export const createNewUser = async (req: Request, res: Response) => {
  const { name, email, password, roleId } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email and password are required" });
  }
  //todo : implement password hashing
  //todo : implement role assignment
  //todo : implement email validation
  const newUser = await createUser({ name, email, password, roleId });

  newUser
    ? res.status(201).json(newUser)
    : res.status(400).json({ message: "User not created" });
};
