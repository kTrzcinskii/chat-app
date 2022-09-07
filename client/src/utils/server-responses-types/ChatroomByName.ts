import Chatroom from "../interfaces/basic/Chatroom";

export default interface IChatroomsByNameResponse {
  chatrooms: Chatroom[];
  newCursor?: string;
}
