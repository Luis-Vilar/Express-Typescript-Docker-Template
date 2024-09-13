-- CreateEnum
CREATE TYPE "Permision" AS ENUM ('CREATE', 'READ', 'UPDATE', 'DELETE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'GUEST');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Permisions" (
    "permisionId" SERIAL NOT NULL,
    "permision" "Permision" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Permisions_pkey" PRIMARY KEY ("permisionId")
);

-- CreateTable
CREATE TABLE "Roles" (
    "roleId" SERIAL NOT NULL,
    "role" "Role" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "_PermisionsToRoles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PermisionsToRoles_AB_unique" ON "_PermisionsToRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_PermisionsToRoles_B_index" ON "_PermisionsToRoles"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermisionsToRoles" ADD CONSTRAINT "_PermisionsToRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "Permisions"("permisionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermisionsToRoles" ADD CONSTRAINT "_PermisionsToRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "Roles"("roleId") ON DELETE CASCADE ON UPDATE CASCADE;
