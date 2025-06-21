/*
  Warnings:

  - Added the required column `preview_image` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "preview_image" TEXT NOT NULL;
