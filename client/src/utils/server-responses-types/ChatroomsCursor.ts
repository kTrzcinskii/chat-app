import Chatroom from "../interfaces/basic/Chatroom";

interface ExtendedChatroom extends Chatroom {
  lastMessage?: {
    username: string;
    content: string;
    createdAt: string;
  };
  users: {
    username: string;
    id: string;
  }[];
}

export default interface ChatroomsCursor {
  newCursor?: string;
  chatrooms: ExtendedChatroom[];
}
