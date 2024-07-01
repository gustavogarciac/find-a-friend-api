/*
  Warnings:

  - You are about to drop the `PetRequirements` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `requirements` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PetRequirements" DROP CONSTRAINT "PetRequirements_pet_id_fkey";

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "requirements" TEXT NOT NULL;

-- DropTable
DROP TABLE "PetRequirements";
