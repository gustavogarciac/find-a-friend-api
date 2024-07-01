/*
  Warnings:

  - You are about to drop the column `requirements` on the `Pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "requirements";

-- CreateTable
CREATE TABLE "PetRequirements" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "PetRequirements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PetRequirements" ADD CONSTRAINT "PetRequirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
