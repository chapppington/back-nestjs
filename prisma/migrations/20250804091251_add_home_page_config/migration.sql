-- CreateTable
CREATE TABLE "home_page_config" (
    "id" TEXT NOT NULL,
    "first_screen" JSONB NOT NULL,
    "rotating_text" TEXT NOT NULL,
    "mission_screen" JSONB NOT NULL,
    "products_screen" JSONB NOT NULL,
    "reviews_screen" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "home_page_config_pkey" PRIMARY KEY ("id")
);
