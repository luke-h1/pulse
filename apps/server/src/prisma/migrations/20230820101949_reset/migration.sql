/*
  Warnings:

  - Added the required column `readingTime` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `readingTime` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "readingTime" TEXT NOT NULL,
ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "readingTime" TEXT NOT NULL,
ALTER COLUMN "content" SET NOT NULL;
