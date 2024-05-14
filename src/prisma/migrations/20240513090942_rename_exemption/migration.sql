/*
  Warnings:

  - You are about to drop the `ExemptionRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ExemptionRequest";

-- CreateTable
CREATE TABLE "Exemption" (
    "id" SERIAL NOT NULL,
    "hourlyRate" DOUBLE PRECISION NOT NULL,
    "reason" TEXT NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "Exemption_pkey" PRIMARY KEY ("id")
);
