-- CreateEnum
CREATE TYPE "public"."FormType" AS ENUM ('REQUEST', 'VACANCY', 'QUESTIONNAIRE', 'DEFAULT');

-- CreateTable
CREATE TABLE "public"."form_submissions" (
    "id" TEXT NOT NULL,
    "form_type" "public"."FormType" NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "comments" TEXT,
    "files" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "meta" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form_submissions_pkey" PRIMARY KEY ("id")
);
