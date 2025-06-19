/*
  Warnings:

  - Added the required column `description` to the `portfolio_items` table without a default value. This is not possible if the table is not empty.
  - Made the column `poster` on table `portfolio_items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `portfolio_items` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "portfolio_items" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "poster" SET NOT NULL,
ALTER COLUMN "year" SET NOT NULL;
