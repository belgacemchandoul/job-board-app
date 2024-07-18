/*
  Warnings:

  - You are about to drop the column `profiles` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "profiles",
ADD COLUMN     "skills" JSONB[];
