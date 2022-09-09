import axiosInstance from "../utils/axiosInstance";
import { BACKEND_URL } from "../utils/constants";
import ISuccessfulResponse from "../utils/server-responses-types/SuccessfulResponse";

export default function joinChatroom(chatroomId: string) {
  const endpoint = `${BACKEND_URL}/chatrooms/join/${chatroomId}`;
  return axiosInstance.post<ISuccessfulResponse>(endpoint);
}
