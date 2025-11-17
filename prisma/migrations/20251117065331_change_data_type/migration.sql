/*
  Warnings:

  - You are about to drop the column `name` on the `facility` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `facility` DROP COLUMN `name`,
    ADD COLUMN `college` VARCHAR(45) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `course` VARCHAR(191) NULL;
