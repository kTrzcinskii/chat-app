import axiosInstance from "../utils/axiosInstance";
import { BACKEND_URL } from "../utils/constants";
import { ICreateChatroomSchema } from "../utils/schemas/CreateChatroomSchema";
import { ICreateChatroomResponse } from "../utils/server-responses-types/CreateChatroom";

const endpoint = `${BACKEND_URL}/chatrooms/create`;

export default function createChatroom(values: ICreateChatroomSchema) {
  return axiosInstance.post<ICreateChatroomResponse>(endpoint, values);
}
