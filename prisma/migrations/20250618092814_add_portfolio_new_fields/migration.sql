/*
  Warnings:

  - You are about to drop the column `solution_image` on the `portfolio_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "portfolio_items" DROP COLUMN "solution_image",
ADD COLUMN     "full_video_path" TEXT,
ADD COLUMN     "preview_video_path" TEXT,
ADD COLUMN     "solution_images" TEXT[],
ADD COLUMN     "year" INTEGER;
