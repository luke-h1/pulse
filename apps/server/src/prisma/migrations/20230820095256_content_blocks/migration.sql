/*
  Warnings:

  - You are about to drop the column `readingTime` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `readingTime` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "readingTime";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "readingTime";
