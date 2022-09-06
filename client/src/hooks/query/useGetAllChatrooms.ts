import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import getAllChatrooms from "../../api/getAllChatrooms";
import ChatroomsCursor from "../../utils/server-responses-types/ChatroomsCursor";
import IServerErrorResponse from "../../utils/server-responses-types/error-response";

export default function useGetAllChatroom(limit?: number, searchTerm?: string) {
  return useInfiniteQuery<
    ChatroomsCursor,
    Error | AxiosError<IServerErrorResponse>
  >(
    ["user-chatrooms"],
    async ({ pageParam = undefined }) => {
      const res = await getAllChatrooms({
        limit,
        cursor: pageParam,
        searchTerm,
      });
      return res.data;
    },
    {
      getNextPageParam: (firstPage) => firstPage.newCursor ?? undefined,
      getPreviousPageParam: (lastPage) => lastPage.newCursor ?? undefined,
      keepPreviousData: true,
    }
  );
}
