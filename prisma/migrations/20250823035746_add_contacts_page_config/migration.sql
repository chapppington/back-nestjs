-- CreateTable
CREATE TABLE "contacts_page_config" (
    "id" TEXT NOT NULL,
    "departments" JSONB NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_page_config_pkey" PRIMARY KEY ("id")
);
