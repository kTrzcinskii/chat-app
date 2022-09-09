import Chatroom from "../interfaces/basic/Chatroom";
import Invitation from "../interfaces/basic/Invitation";
import Request from "../interfaces/basic/Request";

interface InvitationWithInvitedByUsername extends Invitation {
  invitedBy: { username: string };
}

export interface ChatroomWithStatus extends Chatroom {
  status: "INVITED" | "REQUESTED" | "NO-STATUS";
  request: Request | null;
  invitation: InvitationWithInvitedByUsername | null;
}

export default interface IChatroomsByNameResponse {
  chatrooms: ChatroomWithStatus[];
  newCursor?: string;
}
