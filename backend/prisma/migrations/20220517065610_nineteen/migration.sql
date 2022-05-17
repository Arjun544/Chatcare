/*
  Warnings:

  - You are about to drop the column `user` on the `Reaction` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "user",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reactionNewId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_reactionNewId_fkey" FOREIGN KEY ("reactionNewId") REFERENCES "Reaction"("newId") ON DELETE SET NULL ON UPDATE CASCADE;
