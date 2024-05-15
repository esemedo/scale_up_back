/*
  Warnings:

  - You are about to drop the column `mail` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `mail` on the `Contributor` table. All the data in the column will be lost.
  - Added the required column `email` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Contributor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "mail",
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Contributor" DROP COLUMN "mail",
ADD COLUMN     "email" TEXT NOT NULL;
