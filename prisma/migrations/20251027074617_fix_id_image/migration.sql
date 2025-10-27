/*
  Warnings:

  - You are about to drop the column `public_Id` on the `image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `image` DROP COLUMN `public_Id`,
    ADD COLUMN `public_id` VARCHAR(45) NULL;
