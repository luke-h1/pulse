-- AlterTable
ALTER TABLE "User" ALTER COLUMN "provider" SET DEFAULT 'email';

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "etag" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_location_key_key" ON "Image"("location", "key");
