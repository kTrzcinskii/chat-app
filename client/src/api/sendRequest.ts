import axiosInstance from "../utils/axiosInstance";
import { BACKEND_URL } from "../utils/constants";
import Request from "../utils/interfaces/basic/Request";

const endpoint = `${BACKEND_URL}/requests/create`;
export default function sendRequest(chatroomId: string) {
  return axiosInstance.post<Request>(endpoint, { chatroomId });
}
