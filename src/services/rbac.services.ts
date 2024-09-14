import { $Enums } from "@prisma/client";
import { NextFunction } from "express";
import prisma from "./prisma.service";

export async function getRoleId(role: $Enums.Role): Promise<number> {
  return (await prisma.roles.findFirst({ where: { role } })).roleId;
}

export function getFullRoleDetails(roleId: number) {
  return prisma.roles.findFirst({
    where: {
      roleId,
    },
    include: {
      permissions: true,
    },
  });
}

export const rbacMiddleware = async (req: any, res: any, next: NextFunction) => {
  console.log("RBAC Middleware");
  next()
}