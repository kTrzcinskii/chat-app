import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import getChatroomMessages from "../../api/getChatroomMessages";
import IChatroomMessages from "../../utils/server-responses-types/ChatroomMessages";
import IServerErrorResponse from "../../utils/server-responses-types/error-response";

export default function useGetChatroomMessages(
  chatroomId: string,
  limit?: number
) {
  return useInfiniteQuery<
    IChatroomMessages,
    Error | AxiosError<IServerErrorResponse>
  >(
    [`chatroom-messages-${chatroomId}`],
    async ({ pageParam = undefined }) => {
      const res = await getChatroomMessages(chatroomId, {
        limit,
        cursor: pageParam,
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
