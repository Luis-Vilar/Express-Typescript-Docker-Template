/*
  Warnings:

  - You are about to drop the `Permisions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PermisionsToRoles` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('CREATE', 'READ', 'UPDATE', 'DELETE');

-- DropForeignKey
ALTER TABLE "_PermisionsToRoles" DROP CONSTRAINT "_PermisionsToRoles_A_fkey";

-- DropForeignKey
ALTER TABLE "_PermisionsToRoles" DROP CONSTRAINT "_PermisionsToRoles_B_fkey";

-- DropTable
DROP TABLE "Permisions";

-- DropTable
DROP TABLE "_PermisionsToRoles";

-- DropEnum
DROP TYPE "Permision";

-- CreateTable
CREATE TABLE "Permissions" (
    "permisionId" SERIAL NOT NULL,
    "permision" "Permission" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("permisionId")
);

-- CreateTable
CREATE TABLE "_PermissionsToRoles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionsToRoles_AB_unique" ON "_PermissionsToRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionsToRoles_B_index" ON "_PermissionsToRoles"("B");

-- AddForeignKey
ALTER TABLE "_PermissionsToRoles" ADD CONSTRAINT "_PermissionsToRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "Permissions"("permisionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionsToRoles" ADD CONSTRAINT "_PermissionsToRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "Roles"("roleId") ON DELETE CASCADE ON UPDATE CASCADE;
