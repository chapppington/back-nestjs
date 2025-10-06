/*
  Warnings:

  - You are about to drop the column `second_screen` on the `about_page_config` table. All the data in the column will be lost.
  - Added the required column `history_screen` to the `about_page_config` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "about_page_config" DROP COLUMN "second_screen",
ADD COLUMN     "history_screen" JSONB NOT NULL;
