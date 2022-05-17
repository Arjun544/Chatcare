/*
  Warnings:

  - Added the required column `messagesId` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starsId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "messagesId" TEXT NOT NULL,
ADD COLUMN     "starsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "starId" INTEGER;

-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "emojiId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "native" TEXT NOT NULL,
    "messageId" INTEGER,
    "user" INTEGER NOT NULL,
    "colons" TEXT NOT NULL,
    "emoticons" TEXT[],
    "short_names" TEXT[],
    "skin" TEXT NOT NULL,
    "unified" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_starId_fkey" FOREIGN KEY ("starId") REFERENCES "Conversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
