-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "important_characteristics" JSONB NOT NULL,
    "advantages" JSONB NOT NULL,
    "simple_description" JSONB NOT NULL,
    "detailed_description" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductPortfolioItems" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProductPortfolioItems_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProductPortfolioItems_B_index" ON "_ProductPortfolioItems"("B");

-- AddForeignKey
ALTER TABLE "_ProductPortfolioItems" ADD CONSTRAINT "_ProductPortfolioItems_A_fkey" FOREIGN KEY ("A") REFERENCES "portfolio_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductPortfolioItems" ADD CONSTRAINT "_ProductPortfolioItems_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
