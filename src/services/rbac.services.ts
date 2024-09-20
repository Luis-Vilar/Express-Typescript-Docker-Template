import { $Enums } from "@prisma/client";
import prisma from "./prisma.service";
import { RequestWithUser } from "../types";
import { Response, NextFunction } from "express";

export async function getRoleId(role: $Enums.Role): Promise<number> {
  return (await prisma.roles.findFirst({ where: { role } })).roleId;
}

export async function getFullRoleDetails(roleId: number) {
  const roles = await prisma.roles.findFirst({
    where: {
      roleId,
    },
    include: {
      permissions: true,
    },
  });
  return roles;
}

export const rbacMiddleware = (RBAC_REQUIRED: $Enums.Permission[]) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userId = req.user.sub;

    const user = await prisma.user.findFirst({
      where: {
        userId,
      },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found, are you deleted?",
      });
    }
    const userPermissions = user.role.permissions.map(
      (permissions) => permissions.permision
    );

    if (
      !RBAC_REQUIRED.every((permission) => userPermissions.includes(permission))
    ) {
      return res.status(403).json({
        message: "You do not have permission to access this resource",
        required: RBAC_REQUIRED,
        you_have: userPermissions,
      });
    }

    next();
  };
};
