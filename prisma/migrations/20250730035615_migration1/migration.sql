/*
  Warnings:

  - A unique constraint covering the columns `[nft_hash]` on the table `nft_mints` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nft_hash` to the `nft_mints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `nft_mints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_destination` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivered_amount` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `nft_mints` ADD COLUMN `nft_hash` CHAR(64) NOT NULL,
    ADD COLUMN `type` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `account_destination` VARCHAR(35) NOT NULL,
    ADD COLUMN `delivered_amount` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `nft_mints_nft_hash_key` ON `nft_mints`(`nft_hash`);
