import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import sendMessage, { ResponseMessage } from "../../api/sendMessage";
import IServerErrorResponse from "../../utils/server-responses-types/error-response";

interface Content {
  content: string;
}

export default function useSendMessage(chatroomId: string) {
  return useMutation<
    AxiosResponse<ResponseMessage>,
    Error | AxiosError<IServerErrorResponse>,
    Content
  >((values: Content) => sendMessage(chatroomId, values.content));
}
