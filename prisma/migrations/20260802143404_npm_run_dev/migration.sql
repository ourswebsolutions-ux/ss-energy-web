-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `originalPrice` VARCHAR(191) NULL,
    `discountedPrice` VARCHAR(191) NOT NULL,
    `savings` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `buttonText` VARCHAR(191) NOT NULL DEFAULT 'Add To Cart',
    `category` VARCHAR(191) NULL,
    `targetSection` VARCHAR(191) NOT NULL,
    `warranty` VARCHAR(191) NULL,
    `inStock` BOOLEAN NOT NULL DEFAULT true,
    `badgeText` VARCHAR(191) NULL,
    `specs` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
