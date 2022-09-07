import axiosInstance from "../utils/axiosInstance";
import { BACKEND_URL } from "../utils/constants";
import addQueryParamsToUrl from "../utils/helpers/addQueryParamsToUrl";
import UserChatrooms from "../utils/interfaces/UserChatrooms";
import ChatroomsCursor from "../utils/server-responses-types/ChatroomsCursor";

const endpoint = `${BACKEND_URL}/chatrooms?`;

export default async function getAllChatrooms(query?: UserChatrooms) {
  if (!query) {
    return axiosInstance.get<ChatroomsCursor>(endpoint);
  }

  const finalEndpoint = addQueryParamsToUrl(endpoint, query);
  return axiosInstance.get<ChatroomsCursor>(finalEndpoint);
}
