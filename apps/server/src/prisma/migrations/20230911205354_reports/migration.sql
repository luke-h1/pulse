-- CreateTable
CREATE TABLE "AdminReport" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "content" JSONB NOT NULL,
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminReport_id_key" ON "AdminReport"("id");

-- AddForeignKey
ALTER TABLE "AdminReport" ADD CONSTRAINT "AdminReport_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
