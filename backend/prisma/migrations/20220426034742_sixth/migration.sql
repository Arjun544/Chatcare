/*
  Warnings:

  - You are about to drop the column `byId` on the `Conversation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_byId_fkey";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "byId";
