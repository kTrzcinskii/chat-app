import Message from "./basic/Message";

export default interface MessagesWithAuthor extends Message {
  author: { username: string };
}
