import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import getChatroomsByName from "../../api/getChatroomsByName";
import IChatroomsByNameResponse from "../../utils/server-responses-types/ChatroomByName";
import IServerErrorResponse from "../../utils/server-responses-types/error-response";

export default function useGetChatroomsByName(name: string, limit?: number) {
  return useInfiniteQuery<
    IChatroomsByNameResponse,
    Error | AxiosError<IServerErrorResponse>
  >(
    ["chatrooms-by-name"],
    async ({ pageParam = undefined }) => {
      const res = await getChatroomsByName({ name, limit, cursor: pageParam });
      return res.data;
    },
    {
      getNextPageParam: (firstPage) => firstPage.newCursor ?? undefined,
      getPreviousPageParam: (lastPage) => lastPage.newCursor ?? undefined,
      keepPreviousData: true,
      enabled: false,
    }
  );
}
