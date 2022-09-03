import axios from "axios";
import { useRouter } from "next/router";
import { Fragment } from "react";
import useGetAllChatroom from "../../hooks/query/useGetAllChatrooms";
import ErrorMsg from "../utils/ErrorMsg";
import Spinner from "../utils/Spinner";
import ChatroomCard from "./ChatroomCard";

const ChatroomsContainer: React.FC = () => {
  const { data, fetchNextPage, isFetching, isError, error } =
    useGetAllChatroom(10);

  const router = useRouter();

  if (isError && axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      router.push("/unauthorized");
    }
  }

  const headerDivHeight = 100;

  return (
    <div className='bg-my-dark-light w-full h-full relative'>
      <div
        className='flex justify-center items-center'
        style={{ height: `${headerDivHeight}px` }}
      >
        <h1 className='w-full text-center text-white text-3xl lg:text-4xl'>
          My chatrooms
        </h1>
      </div>
      <div
        className='border-t-2 border-white overflow-y-scroll overflow-x-hidden no-scrollbar'
        style={{ height: `calc(100vh - ${headerDivHeight}px)` }}
      >
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
