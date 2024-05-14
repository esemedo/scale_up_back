/*
  Warnings:

  - Added the required column `subjectId` to the `Exemption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exemption" ADD COLUMN     "subjectId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ContributorToSubject" (
    "contributorId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "ContributorToSubject_pkey" PRIMARY KEY ("contributorId","subjectId")
);

-- AddForeignKey
ALTER TABLE "Exemption" ADD CONSTRAINT "Exemption_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exemption" ADD CONSTRAINT "Exemption_contributorId_subjectId_fkey" FOREIGN KEY ("contributorId", "subjectId") REFERENCES "ContributorToSubject"("contributorId", "subjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContributorToSubject" ADD CONSTRAINT "ContributorToSubject_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Contributor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContributorToSubject" ADD CONSTRAINT "ContributorToSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
