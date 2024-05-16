-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_contractId_fkey";

-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_quotationId_fkey";

-- AlterTable
ALTER TABLE "Bill" ALTER COLUMN "contractId" DROP NOT NULL,
ALTER COLUMN "total" DROP NOT NULL,
ALTER COLUMN "quotationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "Quotation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
