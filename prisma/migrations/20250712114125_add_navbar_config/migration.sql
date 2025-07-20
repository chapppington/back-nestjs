-- CreateTable
CREATE TABLE "navbar_config" (
    "id" TEXT NOT NULL,
    "desktop_navbar_config" JSONB NOT NULL,
    "navbar_email" TEXT,
    "navbar_phone" TEXT,
    "navbar_cta_button_text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "navbar_config_pkey" PRIMARY KEY ("id")
);
