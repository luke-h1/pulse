/*
  Warnings:

  - Added the required column `readingTime` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readingTime` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "readingTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "readingTime" TEXT NOT NULL;
