import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import joinChatroom from "../../api/joinChatroom";
import IServerErrorResponse from "../../utils/server-responses-types/error-response";
import ISuccessfulResponse from "../../utils/server-responses-types/SuccessfulResponse";

interface ChatroomId {
  chatroomId: string;
}

export default function useJoinChatroom() {
  return useMutation<
    AxiosResponse<ISuccessfulResponse>,
    Error | AxiosError<IServerErrorResponse>,
    ChatroomId
  >((values: ChatroomId) => joinChatroom(values.chatroomId));
}
