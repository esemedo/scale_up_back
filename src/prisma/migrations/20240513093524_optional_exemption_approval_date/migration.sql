-- AlterTable
ALTER TABLE "Exemption" ALTER COLUMN "status" SET DEFAULT 0,
ALTER COLUMN "approvalDate" DROP NOT NULL;
