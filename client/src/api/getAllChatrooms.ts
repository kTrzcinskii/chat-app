import axiosInstance from "../utils/axiosInstance";
import { BACKEND_URL } from "../utils/constants";
import transformUrlWithQueryCursor from "../utils/helpers/transformUrlWithQueryCursor";
import UserChatrooms from "../utils/interfaces/UserChatrooms";
import ChatroomsCursor from "../utils/server-responses-types/ChatroomsCursor";

const endpoint = `${BACKEND_URL}/chatrooms?`;

export default async function getAllChatrooms(query?: UserChatrooms) {
  let finalEndpoint = transformUrlWithQueryCursor(endpoint, query);
  if (query?.searchTerm) {
    finalEndpoint += `&searchTerm=${query.searchTerm}`;
  }
  return axiosInstance.get<ChatroomsCursor>(finalEndpoint);
}
