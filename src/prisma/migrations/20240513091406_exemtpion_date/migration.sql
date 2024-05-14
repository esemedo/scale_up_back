/*
  Warnings:

  - Added the required column `approvalDate` to the `Exemption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exemption" ADD COLUMN     "approvalDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
