import axiosInstance from "../utils/axiosInstance";
import { BACKEND_URL } from "../utils/constants";
import addQueryParamsToUrl from "../utils/helpers/addQueryParamsToUrl";
import QueryWithCursor from "../utils/interfaces/QueryWithCursor";
import IChatroomMessages from "../utils/server-responses-types/ChatroomMessages";

export default function getChatroomMessages(
  chatroomId: string,
  query: QueryWithCursor
) {
  const endpoint = `${BACKEND_URL}/messages/all/${chatroomId}?`;
  const finalEndpoint = addQueryParamsToUrl(endpoint, query);
  return axiosInstance.get<IChatroomMessages>(finalEndpoint);
}
