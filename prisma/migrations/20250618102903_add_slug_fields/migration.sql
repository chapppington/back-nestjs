/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `news` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `portfolio_items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `news` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `portfolio_items` table without a default value. This is not possible if the table is not empty.

*/
-- Add temporary columns
ALTER TABLE "news" ADD COLUMN "temp_slug" TEXT;
ALTER TABLE "portfolio_items" ADD COLUMN "temp_slug" TEXT;

-- Generate slugs for existing records
UPDATE "news" SET "temp_slug" = LOWER(REGEXP_REPLACE(title, '[^a-zA-Z0-9]', '-', 'g'));
UPDATE "portfolio_items" SET "temp_slug" = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]', '-', 'g'));

-- Add the final slug columns
ALTER TABLE "news" ADD COLUMN "slug" TEXT;
ALTER TABLE "portfolio_items" ADD COLUMN "slug" TEXT;

-- Copy data from temporary columns
UPDATE "news" SET "slug" = "temp_slug";
UPDATE "portfolio_items" SET "slug" = "temp_slug";

-- Make slug columns required
ALTER TABLE "news" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "portfolio_items" ALTER COLUMN "slug" SET NOT NULL;

-- Add unique constraints
CREATE UNIQUE INDEX "news_slug_key" ON "news"("slug");
CREATE UNIQUE INDEX "portfolio_items_slug_key" ON "portfolio_items"("slug");

-- Remove temporary columns
ALTER TABLE "news" DROP COLUMN "temp_slug";
ALTER TABLE "portfolio_items" DROP COLUMN "temp_slug";
