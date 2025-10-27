/*
  Warnings:

  - A unique constraint covering the columns `[role]` on the table `role` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `role_role_key` ON `role`(`role`);
