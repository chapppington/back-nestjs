-- CreateTable
CREATE TABLE "about_page_config" (
    "id" TEXT NOT NULL,
    "first_screen" JSONB NOT NULL,
    "second_screen" JSONB NOT NULL,
    "team_screen" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_page_config_pkey" PRIMARY KEY ("id")
);
