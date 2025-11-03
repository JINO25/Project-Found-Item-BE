/*
  Warnings:

  - Made the column `name` on table `image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url` on table `image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `public_id` on table `image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `des` on table `item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `create_At` on table `post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `image` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `url` VARCHAR(255) NOT NULL,
    MODIFY `public_id` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `item` MODIFY `des` VARCHAR(255) NOT NULL,
    MODIFY `name` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `post` MODIFY `content` TEXT NOT NULL,
    MODIFY `create_At` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `title` VARCHAR(100) NOT NULL;

-- CreateTable
CREATE TABLE `password_reset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `token` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
