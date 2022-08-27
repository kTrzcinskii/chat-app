-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_chatroomId_fkey";

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "chatrooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
