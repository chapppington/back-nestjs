-- CreateTable
CREATE TABLE "footer_config" (
    "id" TEXT NOT NULL,
    "footer_links_config" JSONB NOT NULL,
    "department_items" JSONB NOT NULL,
    "footer_address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footer_config_pkey" PRIMARY KEY ("id")
);
