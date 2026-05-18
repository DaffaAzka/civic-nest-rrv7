/*
  Warnings:

  - Added the required column `districtName` to the `Rw` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceName` to the `Rw` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regencyName` to the `Rw` table without a default value. This is not possible if the table is not empty.
  - Added the required column `villageName` to the `Rw` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rw" ADD COLUMN     "districtName" TEXT NOT NULL,
ADD COLUMN     "provinceName" TEXT NOT NULL,
ADD COLUMN     "regencyName" TEXT NOT NULL,
ADD COLUMN     "villageName" TEXT NOT NULL;
