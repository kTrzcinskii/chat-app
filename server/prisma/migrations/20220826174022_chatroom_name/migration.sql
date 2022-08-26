/*
  Warnings:

  - Added the required column `name` to the `chatrooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chatrooms" ADD COLUMN     "name" TEXT NOT NULL;
