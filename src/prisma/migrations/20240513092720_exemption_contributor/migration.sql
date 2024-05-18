/*
  Warnings:

  - Added the required column `contributorId` to the `Exemption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exemption" ADD COLUMN     "contributorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Exemption" ADD CONSTRAINT "Exemption_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Contributor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
