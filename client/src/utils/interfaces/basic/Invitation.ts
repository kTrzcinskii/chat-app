export default interface Invitation {
  id: string;
  createdAt: string;
  invitedById: string;
  invitedUserId: string;
  chatroomId: string;
}
