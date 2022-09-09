import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import sendRequest from "../../api/sendRequest";
import Request from "../../utils/interfaces/basic/Request";
import IServerErrorResponse from "../../utils/server-responses-types/error-response";

interface ChatroomdId {
  chatroomId: string;
}

export default function useSendRequest() {
  return useMutation<
    AxiosResponse<Request>,
    Error | AxiosError<IServerErrorResponse>,
    ChatroomdId
  >((values: ChatroomdId) => sendRequest(values.chatroomId));
}
