/*
  Warnings:

  - Added the required column `address` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "address" TEXT NOT NULL;
