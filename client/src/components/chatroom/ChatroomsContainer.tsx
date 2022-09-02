import axios from "axios";
import { useRouter } from "next/router";
import { Fragment } from "react";
import useGetAllChatroom from "../../hooks/query/useGetAllChatrooms";
import ErrorMsg from "../utils/ErrorMsg";
import Spinner from "../utils/Spinner";
import ChatroomCard from "./ChatroomCard";

const ChatroomsContainer: React.FC = () => {
  const { data, fetchNextPage, isFetching, isError, error } =
    useGetAllChatroom(1);

  const router = useRouter();

  if (isError && axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      router.push("/unauthorized");
    }
  }

  return (
    <div className='bg-my-dark-light w-full h-full relative'>
      <h1 className='w-full text-center text-white mt-10 text-3xl lg:text-4xl mb-10'>
        My chatrooms
      </h1>
      <div className='border-t-2 border-white'>
        {data?.pages.map((page, index) => {
          return (
            <Fragment key={index}>
              {page.chatrooms.map((chatroom) => {
                return (
                  <Fragment key={chatroom.id}>
                    <ChatroomCard {...chatroom} />
                  </Fragment>
                );
              })}
            </Fragment>
          );
        })}
      </div>

      {isFetching && <Spinner centered={!data} />}
      {isError && <ErrorMsg message={error?.message} />}
      <button onClick={() => fetchNextPage()}>fetch</button>
    </div>
  );
};

export default ChatroomsContainer;
