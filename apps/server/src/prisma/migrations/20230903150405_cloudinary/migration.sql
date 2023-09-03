/*
  Warnings:

  - You are about to drop the column `imageFilename` on the `Post` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'SCHEDULED';

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imageFilename";
