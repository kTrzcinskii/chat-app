import axiosInstance from "../utils/axiosInstance";
import { BACKEND_URL } from "../utils/constants";
import Message from "../utils/interfaces/basic/Message";

export interface ResponseMessage {
  message: Message;
}

export default function sendMessage(chatroomId: string, content: string) {
  const endpoint = `${BACKEND_URL}/messages/${chatroomId}`;
  return axiosInstance.post<ResponseMessage>(endpoint, { content });
}
