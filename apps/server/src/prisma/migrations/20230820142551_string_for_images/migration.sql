/*
  Warnings:

  - You are about to drop the column `imageId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `PostImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_imageId_fkey";

-- DropIndex
DROP INDEX "Post_imageId_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imageId",
ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "PostImage";
