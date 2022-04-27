/*
  Warnings:

  - You are about to drop the `MsgRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MsgRequest" DROP CONSTRAINT "MsgRequest_userId_fkey";

-- DropTable
DROP TABLE "MsgRequest";
