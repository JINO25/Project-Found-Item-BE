-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_collegeId_fkey`;

-- DropIndex
DROP INDEX `user_collegeId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` MODIFY `collegeId` INTEGER NULL,
    MODIFY `course` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_collegeId_fkey` FOREIGN KEY (`collegeId`) REFERENCES `facility`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
