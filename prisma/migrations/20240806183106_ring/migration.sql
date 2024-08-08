/*
  Warnings:

  - A unique constraint covering the columns `[ring]` on the table `birds` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ring` to the `birds` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `gender` on the `birds` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('f', 'm');

-- AlterTable
ALTER TABLE "birds" ADD COLUMN     "ring" TEXT NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "birds_ring_key" ON "birds"("ring");
