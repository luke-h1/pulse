-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PUBLISHED', 'DRAFT');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'DRAFT';
