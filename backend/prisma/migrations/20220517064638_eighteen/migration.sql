/*
  Warnings:

  - The primary key for the `Reaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `emojiId` on the `Reaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_pkey",
DROP COLUMN "emojiId",
ADD COLUMN     "newId" SERIAL NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Reaction_pkey" PRIMARY KEY ("newId");
DROP SEQUENCE "Reaction_id_seq";
