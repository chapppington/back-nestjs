-- CreateTable
CREATE TABLE "portfolio_items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "poster" TEXT,
    "task_title" TEXT NOT NULL,
    "task_description" TEXT NOT NULL,
    "solution_title" TEXT NOT NULL,
    "solution_description" TEXT NOT NULL,
    "solution_subtitle" TEXT NOT NULL,
    "solution_subdescription" TEXT NOT NULL,
    "solution_image" TEXT,
    "has_review" BOOLEAN NOT NULL DEFAULT false,
    "review_title" TEXT,
    "review_text" TEXT,
    "review_name" TEXT,
    "review_image" TEXT,
    "review_role" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portfolio_items_pkey" PRIMARY KEY ("id")
);
