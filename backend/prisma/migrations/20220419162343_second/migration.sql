/*
  Warnings:

  - You are about to drop the column `userId` on the `Conversation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[byId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[toId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `byId` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_userId_fkey";

-- DropIndex
DROP INDEX "Conversation_userId_key";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "userId",
ADD COLUMN     "byId" INTEGER NOT NULL,
ADD COLUMN     "toId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_byId_key" ON "Conversation"("byId");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_toId_key" ON "Conversation"("toId");

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_byId_fkey" FOREIGN KEY ("byId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_toId_fkey" FOREIGN KEY ("toId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
