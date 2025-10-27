/*
  Warnings:

  - You are about to drop the column `Create_At` on the `conversation` table. All the data in the column will be lost.
  - You are about to drop the column `User_Id1` on the `conversation` table. All the data in the column will be lost.
  - You are about to drop the column `User_Id2` on the `conversation` table. All the data in the column will be lost.
  - You are about to drop the column `User_id` on the `conversation` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `facility` table. All the data in the column will be lost.
  - You are about to drop the column `Item_id` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `Public_Id` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `Url` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `Des` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `Post_id` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `Type_id` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `Content` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `Conversation_id` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `Create_At` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `Sender_id` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `Content` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `Create_At` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `Latitude` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `Longitude` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `User_id` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `Latitude` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `Longittude` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `type` table. All the data in the column will be lost.
  - You are about to drop the column `Create_At` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `Phone` on the `user` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_id` to the `image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_id` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conversation_id` to the `message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_id` to the `message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `conversation` DROP FOREIGN KEY `fk_Conversation_User1`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `fk_Image_Item1`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `fk_Item_Post1`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `fk_Item_Type1`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `fk_Message_Conversation1`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `fk_Message_User1`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `fk_Post_User`;

-- DropIndex
DROP INDEX `fk_Conversation_User1_idx` ON `conversation`;

-- DropIndex
DROP INDEX `fk_Image_Item1_idx` ON `image`;

-- DropIndex
DROP INDEX `fk_Item_Post1_idx` ON `item`;

-- DropIndex
DROP INDEX `fk_Item_Type1_idx` ON `item`;

-- DropIndex
DROP INDEX `fk_Message_Conversation1_idx` ON `message`;

-- DropIndex
DROP INDEX `fk_Message_User1_idx` ON `message`;

-- DropIndex
DROP INDEX `fk_Post_User_idx` ON `post`;

-- AlterTable
ALTER TABLE `conversation` DROP COLUMN `Create_At`,
    DROP COLUMN `User_Id1`,
    DROP COLUMN `User_Id2`,
    DROP COLUMN `User_id`,
    ADD COLUMN `create_At` DATE NULL,
    ADD COLUMN `user_Id1` INTEGER NULL,
    ADD COLUMN `user_Id2` INTEGER NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `facility` DROP COLUMN `Name`,
    ADD COLUMN `name` VARCHAR(45) NULL;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `Item_id`,
    DROP COLUMN `Name`,
    DROP COLUMN `Public_Id`,
    DROP COLUMN `Url`,
    ADD COLUMN `item_id` INTEGER NOT NULL,
    ADD COLUMN `name` VARCHAR(255) NULL,
    ADD COLUMN `public_Id` VARCHAR(45) NULL,
    ADD COLUMN `url` VARCHAR(45) NULL;

-- AlterTable
ALTER TABLE `item` DROP COLUMN `Des`,
    DROP COLUMN `Name`,
    DROP COLUMN `Post_id`,
    DROP COLUMN `Status`,
    DROP COLUMN `Type_id`,
    ADD COLUMN `des` VARCHAR(255) NULL,
    ADD COLUMN `name` VARCHAR(45) NULL,
    ADD COLUMN `post_id` INTEGER NOT NULL,
    ADD COLUMN `status` ENUM('Lost', 'Found') NOT NULL,
    ADD COLUMN `type_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `message` DROP COLUMN `Content`,
    DROP COLUMN `Conversation_id`,
    DROP COLUMN `Create_At`,
    DROP COLUMN `Sender_id`,
    ADD COLUMN `content` VARCHAR(255) NULL,
    ADD COLUMN `conversation_id` INTEGER NOT NULL,
    ADD COLUMN `create_At` DATE NULL,
    ADD COLUMN `sender_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `Content`,
    DROP COLUMN `Create_At`,
    DROP COLUMN `Latitude`,
    DROP COLUMN `Longitude`,
    DROP COLUMN `User_id`,
    ADD COLUMN `content` VARCHAR(255) NULL,
    ADD COLUMN `create_At` DATE NULL,
    ADD COLUMN `latitude` DECIMAL(10, 8) NULL,
    ADD COLUMN `longitude` DECIMAL(11, 8) NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `Latitude`,
    DROP COLUMN `Longittude`,
    DROP COLUMN `Name`,
    ADD COLUMN `latitude` DECIMAL(10, 8) NULL,
    ADD COLUMN `longittude` DECIMAL(11, 8) NULL,
    ADD COLUMN `name` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `type` DROP COLUMN `Name`,
    ADD COLUMN `name` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `Create_At`,
    DROP COLUMN `Email`,
    DROP COLUMN `Name`,
    DROP COLUMN `Password`,
    DROP COLUMN `Phone`,
    ADD COLUMN `create_At` DATE NULL,
    ADD COLUMN `email` VARCHAR(45) NOT NULL,
    ADD COLUMN `name` VARCHAR(45) NULL,
    ADD COLUMN `password` VARCHAR(45) NOT NULL,
    ADD COLUMN `phone` VARCHAR(45) NULL;

-- CreateIndex
CREATE INDEX `fk_Conversation_User1_idx` ON `conversation`(`user_id`);

-- CreateIndex
CREATE INDEX `fk_Image_Item1_idx` ON `image`(`item_id`);

-- CreateIndex
CREATE INDEX `fk_Item_Post1_idx` ON `item`(`post_id`);

-- CreateIndex
CREATE INDEX `fk_Item_Type1_idx` ON `item`(`type_id`);

-- CreateIndex
CREATE INDEX `fk_Message_Conversation1_idx` ON `message`(`conversation_id`);

-- CreateIndex
CREATE INDEX `fk_Message_User1_idx` ON `message`(`sender_id`);

-- CreateIndex
CREATE INDEX `fk_Post_User_idx` ON `post`(`user_id`);

-- AddForeignKey
ALTER TABLE `conversation` ADD CONSTRAINT `fk_Conversation_User1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `fk_Image_Item1` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `fk_Item_Post1` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `fk_Item_Type1` FOREIGN KEY (`type_id`) REFERENCES `type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `fk_Message_Conversation1` FOREIGN KEY (`conversation_id`) REFERENCES `conversation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `fk_Message_User1` FOREIGN KEY (`sender_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `fk_Post_User` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
