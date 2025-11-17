/*
  Warnings:

  - You are about to drop the `conversation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `message` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `collegeId` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `conversation` DROP FOREIGN KEY `fk_Conversation_User1`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `fk_Message_Conversation1`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `fk_Message_User1`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `collegeId` INTEGER NOT NULL,
    ADD COLUMN `course` INTEGER NOT NULL;

-- DropTable
DROP TABLE `conversation`;

-- DropTable
DROP TABLE `message`;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_collegeId_fkey` FOREIGN KEY (`collegeId`) REFERENCES `facility`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
