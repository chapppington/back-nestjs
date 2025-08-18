-- CreateTable
CREATE TABLE "vacancies_page_config" (
    "id" TEXT NOT NULL,
    "first_screen" JSONB NOT NULL,
    "second_screen" JSONB NOT NULL,
    "third_screen" JSONB NOT NULL,
    "fourth_screen" JSONB NOT NULL,
    "fifth_screen" JSONB NOT NULL,
    "sixth_screen" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vacancies_page_config_pkey" PRIMARY KEY ("id")
);
