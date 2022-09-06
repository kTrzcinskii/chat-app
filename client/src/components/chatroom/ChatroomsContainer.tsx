import axios from "axios";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import useGetAllChatroom from "../../hooks/query/useGetAllChatrooms";
import Avatar from "../utils/Avatar";
import ErrorMsg from "../utils/ErrorMsg";
import Spinner from "../utils/Spinner";
import ChatroomCard from "./ChatroomCard";
import basic_user_avatar from "../../../public/images/basic_user_avatar.png";
import { useInView } from "react-intersection-observer";

const ChatroomsContainer: React.FC = () => {
  // TODO: add backend logic to manage searching
  const [searchTerm, setSearchTerm] = useState("");

  const { data, fetchNextPage, isFetching, isError, error } =
    useGetAllChatroom(8);
  const { ref: fetcherRef, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const router = useRouter();

  if (isError && axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      router.push("/unauthorized");
    }
  }

  const headerDivHeight = 120;

  return (
    <div className='bg-my-dark-light w-full h-full relative'>
      <div
        className='flex flex-row justify-center items-center space-x-8'
        style={{ height: `${headerDivHeight}px` }}
      >
        <Avatar size={80} img_src={basic_user_avatar} />
        <div className='space-y-3'>
          <input
            type='text'
            placeholder='Search through your chatrooms...'
            className='shadow appearance-none rounded w-[300px] py-2 px-3 text-my-dark-dark leading-tight focus:outline-none focus:outline-my-cyan-light focus:outline-offset-0 focus:outline-[3px] placeholder:text-my-dark-dark'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className='flex flex-row space-x-5'>
            <button className='btn my-bg-cyan text-zinc-800 font-semibold min-w-[140px]'>
              Join
            </button>
            <button className='btn my-bg-cyan text-zinc-800 font-semibold min-w-[140px]'>
              Create
            </button>
          </div>
        </div>
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
        <div ref={fetcherRef} />
        {isFetching && <Spinner centered={!data} />}
        {isError && <ErrorMsg message={error?.message} />}
      </div>
    </div>
  );
};

export default ChatroomsContainer;
