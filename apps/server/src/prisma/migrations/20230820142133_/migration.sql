/*
  Warnings:

  - You are about to drop the column `image` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "image",
ADD COLUMN     "imageId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "PostImage" (
    "id" TEXT NOT NULL,
    "etag" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "postId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostImage_location_key_key" ON "PostImage"("location", "key");

-- CreateIndex
CREATE UNIQUE INDEX "Post_imageId_key" ON "Post"("imageId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "PostImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
