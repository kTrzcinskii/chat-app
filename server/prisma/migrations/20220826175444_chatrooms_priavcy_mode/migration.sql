-- CreateEnum
CREATE TYPE "PrivacyMode" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "chatrooms" ADD COLUMN     "privacyMode" "PrivacyMode" NOT NULL DEFAULT 'PUBLIC';
