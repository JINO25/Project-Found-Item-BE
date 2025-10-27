-- CreateTable
CREATE TABLE `conversation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `User_Id1` INTEGER NULL,
    `User_Id2` INTEGER NULL,
    `Create_At` DATE NULL,
    `User_id` INTEGER NOT NULL,

    INDEX `fk_Conversation_User1_idx`(`User_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facility` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NULL,
    `Url` VARCHAR(45) NULL,
    `Public_Id` VARCHAR(45) NULL,
    `Item_id` INTEGER NOT NULL,

    INDEX `fk_Image_Item1_idx`(`Item_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(45) NULL,
    `Des` VARCHAR(255) NULL,
    `Post_id` INTEGER NOT NULL,
    `Type_id` INTEGER NOT NULL,
    `Status` ENUM('Lost', 'Found') NOT NULL,

    INDEX `fk_Item_Post1_idx`(`Post_id`),
    INDEX `fk_Item_Type1_idx`(`Type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Content` VARCHAR(255) NULL,
    `Create_At` DATE NULL,
    `Sender_id` INTEGER NOT NULL,
    `Conversation_id` INTEGER NOT NULL,

    INDEX `fk_Message_Conversation1_idx`(`Conversation_id`),
    INDEX `fk_Message_User1_idx`(`Sender_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Content` VARCHAR(255) NULL,
    `Create_At` DATE NULL,
    `Latitude` DECIMAL(10, 8) NULL,
    `Longitude` DECIMAL(11, 8) NULL,
    `User_id` INTEGER NOT NULL,

    INDEX `fk_Post_User_idx`(`User_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(45) NOT NULL,
    `Latitude` DECIMAL(10, 8) NULL,
    `Longittude` DECIMAL(11, 8) NULL,
    `facility_id` INTEGER NOT NULL,

    INDEX `fk_Room_facility1_idx`(`facility_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(45) NULL,
    `Phone` VARCHAR(45) NULL,
    `Email` VARCHAR(45) NOT NULL,
    `Password` VARCHAR(45) NOT NULL,
    `Create_At` DATE NULL,
    `roleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `conversation` ADD CONSTRAINT `fk_Conversation_User1` FOREIGN KEY (`User_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `fk_Image_Item1` FOREIGN KEY (`Item_id`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `fk_Item_Post1` FOREIGN KEY (`Post_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `fk_Item_Type1` FOREIGN KEY (`Type_id`) REFERENCES `type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `fk_Message_Conversation1` FOREIGN KEY (`Conversation_id`) REFERENCES `conversation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `fk_Message_User1` FOREIGN KEY (`Sender_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `fk_Post_User` FOREIGN KEY (`User_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `room` ADD CONSTRAINT `fk_Room_facility1` FOREIGN KEY (`facility_id`) REFERENCES `facility`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
