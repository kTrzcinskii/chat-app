import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import createChatroom from "../../api/createChatroom";
import { ICreateChatroomSchema } from "../../utils/schemas/CreateChatroomSchema";
import { ICreateChatroomResponse } from "../../utils/server-responses-types/CreateChatroom";
import IServerErrorResponse from "../../utils/server-responses-types/error-response";

export default function useCreateChatroom() {
  return useMutation<
    AxiosResponse<ICreateChatroomResponse>,
    Error | AxiosError<IServerErrorResponse>,
    ICreateChatroomSchema
  >((values: ICreateChatroomSchema) => createChatroom(values));
}
