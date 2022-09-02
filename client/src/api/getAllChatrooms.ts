import axiosInstance from "../utils/axiosInstance";
import { BACKEND_URL } from "../utils/constants";
import transformUrlWithQueryCursor from "../utils/helpers/transformUrlWithQueryCursor";
import QueryWithCursor from "../utils/interfaces/QueryWithCursor";
import ChatroomsCursor from "../utils/server-responses-types/ChatroomsCursor";

const endpoint = `${BACKEND_URL}/chatrooms?`;

export default async function getAllChatrooms(query?: QueryWithCursor) {
  const finalEndpoint = transformUrlWithQueryCursor(endpoint, query);
  return axiosInstance.get<ChatroomsCursor>(finalEndpoint);
}
