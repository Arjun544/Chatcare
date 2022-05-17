/*
  Warnings:

  - You are about to drop the column `messagesId` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `starsId` on the `Conversation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "messagesId",
DROP COLUMN "starsId";
