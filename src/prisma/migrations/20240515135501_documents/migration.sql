-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('Resume', 'Diploma', 'CriminalRecord', 'KBIS', 'URSSAFCertificate', 'TaxCertificate');

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "contributorId" INTEGER,
    "type" "DocumentType" NOT NULL,
    "path" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "schoolYears" INTEGER[],
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Contributor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
