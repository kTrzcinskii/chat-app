import {
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import { useInView } from "react-intersection-observer";
import useGetChatroomMessages from "../../hooks/query/useGetChatroomMessages";
import useGetCurrentUserId from "../../hooks/useGetCurrentUserId";
import { MessageEvents } from "../../utils/constants";
import { SocketContext } from "../../utils/socketContext";
import Spinner from "../utils/Spinner";
import MyMessage from "./MyMessage";
import SendingMessage from "./SendingMessage";
import SomeoneMessage from "./SomeoneMessage";

interface MessagesContainerProps {
  inputHeight: number;
  chatroomId: string;
  sendingMessages: {
    content: string;
    chatroomId: string;
  }[];
  setSendingMessages: Dispatch<
    SetStateAction<
      {
        content: string;
        chatroomId: string;
      }[]
    >
  >;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({
  inputHeight,
  chatroomId,
  setSendingMessages,
  sendingMessages,
}) => {
  const { data, fetchNextPage, isFetching, refetch } = useGetChatroomMessages(
    chatroomId,
    25
  );

  const { ref: fetcherRef, inView } = useInView();
  useEffect(() => {
    if (inView) {
      console.log("veiw");
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const currentUserId = useGetCurrentUserId();

  const socket = useContext(SocketContext);

  socket.once(
    MessageEvents.CREATED,
    (payload: { chatroomId: string; content: string }) => {
      if (payload.chatroomId === chatroomId) {
        refetch();
        let first = true;
        const newMess = sendingMessages.filter((mess) => {
          if (
            first &&
            payload.content === mess.content &&
            payload.chatroomId === mess.chatroomId
          ) {
            first = false;
            return false;
          }
          return true;
        });
        setSendingMessages(newMess);
      }
    }
  );

  return (
    <div
      className='w-full overflow-x-hidden overflow-y-scroll no-scrollbar flex flex-col-reverse mt-2'
      style={{ height: `calc(100% - ${inputHeight}px)` }}
    >
      {sendingMessages.map((sendingMessage, index) => {
        return <SendingMessage content={sendingMessage.content} key={index} />;
      })}
      {data?.pages.map((page, index) => {
        return (
          <Fragment key={index}>
            {page.messages.map((message) => {
              return (
                <Fragment key={message.id}>
                  {currentUserId === message.authorId ? (
                    <MyMessage {...message} />
                  ) : (
                    <SomeoneMessage {...message} />
                  )}
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
      {isFetching && <Spinner centered={!data} />}
      <div className='w-full py-[1px]' ref={fetcherRef} />
    </div>
  );
};

export default MessagesContainer;
