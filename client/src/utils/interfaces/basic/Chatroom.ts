export default interface Chatroom {
  id: string;
  name: string;
  privacyMode: "PUBLIC" | "PRIVATE";
  createdAt: string;
  updatedAt: string;
}
