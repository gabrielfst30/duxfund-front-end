-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_payments` INTEGER NOT NULL,
    `id_nft_mints` INTEGER NOT NULL,
    `xrpl_id` INTEGER NOT NULL,
    `type` VARCHAR(20) NOT NULL,
    `hash` CHAR(64) NOT NULL,
    `ledger_index` INTEGER NOT NULL,
    `close_time` TIMESTAMP(3) NOT NULL,
    `validated` TINYINT NOT NULL,
    `result_code` VARCHAR(20) NOT NULL,
    `fee` BIGINT NOT NULL,
    `account` VARCHAR(35) NOT NULL,
    `sequence` BIGINT NOT NULL,
    `last_ledger_seq` BIGINT NULL,
    `flags` BIGINT NULL,
    `ledger_hash` CHAR(64) NULL,
    `ctid` VARCHAR(32) NULL,

    UNIQUE INDEX `transactions_id_payments_key`(`id_payments`),
    UNIQUE INDEX `transactions_id_nft_mints_key`(`id_nft_mints`),
    UNIQUE INDEX `transactions_hash_key`(`hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` INTEGER NOT NULL,
    `destinations` VARCHAR(35) NOT NULL,
    `deliver_max` BIGINT NOT NULL,
    `delivered_amount` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nft_mints` (
    `id` INTEGER NOT NULL,
    `uri` VARCHAR(191) NOT NULL,
    `taxon` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_id_fkey` FOREIGN KEY (`id`) REFERENCES `transactions`(`id_payments`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nft_mints` ADD CONSTRAINT `nft_mints_id_fkey` FOREIGN KEY (`id`) REFERENCES `transactions`(`id_nft_mints`) ON DELETE RESTRICT ON UPDATE CASCADE;
