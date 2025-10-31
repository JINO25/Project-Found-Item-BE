/*
  Warnings:

  - You are about to drop the column `latitude` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `longittude` on the `room` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `fk_Post_User`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `latitude`,
    DROP COLUMN `longitude`,
    ADD COLUMN `facility_id` INTEGER NULL,
    ADD COLUMN `room_id` INTEGER NULL,
    ADD COLUMN `title` VARCHAR(100) NULL,
    MODIFY `content` TEXT NULL;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `longittude`,
    ADD COLUMN `longitude` DECIMAL(11, 8) NULL;

-- CreateIndex
CREATE INDEX `post_facility_id_idx` ON `post`(`facility_id`);

-- CreateIndex
CREATE INDEX `post_room_id_idx` ON `post`(`room_id`);

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_facility_id_fkey` FOREIGN KEY (`facility_id`) REFERENCES `facility`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `room`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `post` RENAME INDEX `fk_Post_User_idx` TO `post_user_id_idx`;
