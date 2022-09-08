import Chatroom from "../interfaces/basic/Chatroom";

export interface ChatroomWithStatus extends Chatroom {
  status: "INVITED" | "REQUESTED" | "NO-STATUS";
}

export default interface IChatroomsByNameResponse {
  chatrooms: ChatroomWithStatus[];
  newCursor?: string;
}
