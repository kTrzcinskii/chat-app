import axiosInstance from "../utils/axiosInstance";
import { BACKEND_URL } from "../utils/constants";
import addQueryParamsToUrl from "../utils/helpers/addQueryParamsToUrl";
import IChatroomsByName from "../utils/interfaces/ChatroomsByName";
import IChatroomsByNameResponse from "../utils/server-responses-types/ChatroomByName";

const endpoint = `${BACKEND_URL}/chatrooms/search?`;

export default function getChatroomsByName(query: IChatroomsByName) {
  const finalEndpoint = addQueryParamsToUrl(endpoint, query);
  return axiosInstance.get<IChatroomsByNameResponse>(finalEndpoint);
}
