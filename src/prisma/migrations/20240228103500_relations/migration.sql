/*
  Warnings:

  - You are about to drop the column `category` on the `Subject` table. All the data in the column will be lost.
  - Added the required column `quotationId` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "quotationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "LegalFile" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "category",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dei" ADD CONSTRAINT "Dei_idNeed_fkey" FOREIGN KEY ("idNeed") REFERENCES "Need"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dei" ADD CONSTRAINT "Dei_idBill_fkey" FOREIGN KEY ("idBill") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_needId_fkey" FOREIGN KEY ("needId") REFERENCES "Need"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "Quotation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
