/*
  Warnings:

  - You are about to drop the column `study` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "study",
ADD COLUMN     "education" JSONB[];
