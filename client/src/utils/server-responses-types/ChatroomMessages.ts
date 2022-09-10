import MessagesWithAuthor from "../interfaces/MessagesWithAuthor";

export default interface IChatroomMessages {
  messages: MessagesWithAuthor[];
  newCursor?: string;
}
