/*
  Warnings:

  - Added the required column `image` to the `Contributor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contributor" ADD COLUMN     "image" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ExemptionRequest" (
    "id" SERIAL NOT NULL,
    "hourlyRate" DOUBLE PRECISION NOT NULL,
    "reason" TEXT NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "ExemptionRequest_pkey" PRIMARY KEY ("id")
);
