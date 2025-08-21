-- CreateTable
CREATE TABLE "certificates_page_config" (
    "id" TEXT NOT NULL,
    "tabs" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certificates_page_config_pkey" PRIMARY KEY ("id")
);
