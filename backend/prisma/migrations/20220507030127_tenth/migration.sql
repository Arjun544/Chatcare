/*
  Warnings:

  - You are about to drop the column `image` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "image",
ADD COLUMN     "images" JSONB[];
