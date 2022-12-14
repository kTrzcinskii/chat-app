import axios from "axios";
import { useRouter } from "next/router";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import useGetAllChatroom from "../../hooks/query/useGetAllChatrooms";
import Avatar from "../utils/Avatar";
import ErrorMsg from "../utils/ErrorMsg";
import Spinner from "../utils/Spinner";
import ChatroomCard from "./ChatroomCard";
import basic_user_avatar from "../../../public/images/basic_user_avatar.png";
import { useInView } from "react-intersection-observer";
import useManageModal from "../../hooks/useManageModal";
import CreateChatroomModal from "../modals/CreateChatroomModal";
import { useQueryClient } from "@tanstack/react-query";
import JoinChatroomModal from "../modals/JoinChatroomModal";
import { ExtendedChatroom } from "../../utils/server-responses-types/ChatroomsCursor";
import { SocketContext } from "../../utils/socketContext";
import useGetCurrentUserId from "../../hooks/useGetCurrentUserId";
import { MessageEvents } from "../../utils/constants";

interface ChatroomsContainerProps {
  setCurrentChatroomInfo: Dispatch<SetStateAction<ExtendedChatroom | null>>;
}

const ChatroomsContainer: React.FC<ChatroomsContainerProps> = ({
  setCurrentChatroomInfo,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [firstFetch, setFirstFetch] = useState(true);

  const {
    data,
    fetchNextPage,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetAllChatroom(8, searchTerm);
  const { ref: fetcherRef, inView } = useInView();
  const queryClient = useQueryClient();

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

  const {
    isVisible: isVisibleCreate,
    openModal: openModalCreate,
    closeModal: closeModalCreate,
  } = useManageModal();

  const {
    isVisible: isVisibleJoin,
    openModal: openModalJoin,
    closeModal: closeModalJoin,
  } = useManageModal();

  const headerDivHeight = 120;

  useEffect(() => {
    if (firstFetch && isSuccess) {
      setCurrentChatroomInfo(data?.pages[0]?.chatrooms[0] ?? null);
      setFirstFetch(false);
    }
  }, [data, setCurrentChatroomInfo, firstFetch, isSuccess]);

  const socket = useContext(SocketContext);

  const currentUserId = useGetCurrentUserId();

  socket.on(MessageEvents.CREATED, (payload: { users: { id: string }[] }) => {
    const l = payload.users.filter((user) => user.id === currentUserId).length;
    if (l !== 0) {
      refetch();
    }
  });

  return (
    <>
      <CreateChatroomModal
        isVisible={isVisibleCreate}
        closeModal={closeModalCreate}
      />
      <JoinChatroomModal
        closeModal={closeModalJoin}
        isVisible={isVisibleJoin}
      />
      <div className='w-full h-full relative bg-my-dark-light'>
        <div
          className='flex flex-row justify-center items-center space-x-3 md:space-x-8'
          style={{ height: `${headerDivHeight}px` }}
        >
          <Avatar size={80} img_src={basic_user_avatar} />
          <div className='space-y-3'>
            <input
              type='text'
              placeholder='Search through your chatrooms...'
              className='shadow appearance-none rounded w-[300px] py-2 px-3 text-my-dark-dark leading-tight focus:outline-none focus:outline-my-cyan-light focus:outline-offset-0 focus:outline-[3px] placeholder:text-my-dark-dark'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                queryClient.removeQueries(["user-chatrooms"]);
              }}
            />
            <div className='flex flex-row space-x-5'>
              <button
                className='btn my-bg-cyan text-zinc-800 font-semibold min-w-[140px]'
                onClick={openModalJoin}
              >
                Join
              </button>
              <button
                className='btn my-bg-cyan text-zinc-800 font-semibold min-w-[140px]'
                onClick={openModalCreate}
              >
                Create
              </button>
            </div>
          </div>
        </div>
        <div
          className='overflow-y-scroll overflow-x-hidden no-scrollbar'
          style={{ height: `calc(100vh - ${headerDivHeight}px)` }}
        >
          {data?.pages.map((page, index) => {
            return (
              <Fragment key={index}>
                {page.chatrooms.map((chatroom) => {
                  return (
                    <Fragment key={chatroom.id}>
                      <ChatroomCard
                        {...chatroom}
                        setCurrentChatroomInfo={setCurrentChatroomInfo}
                      />
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
    </>
  );
};

export default ChatroomsContainer;
