import jwtDecode from "jwt-decode";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useGetChatroomMessages from "../../hooks/query/useGetChatroomMessages";
import Spinner from "../utils/Spinner";
import MyMessage from "./MyMessage";
import SomeoneMessage from "./SomeoneMessage";

interface MessagesContainerProps {
  inputHeight: number;
  chatroomId: string;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({
  inputHeight,
  chatroomId,
}) => {
  const { data, fetchNextPage, isFetching } = useGetChatroomMessages(
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

  return (
    <div
      className='w-full overflow-x-hidden overflow-y-scroll no-scrollbar flex flex-col-reverse mt-2'
      style={{ height: `calc(100% - ${inputHeight}px)` }}
    >
      {data?.pages.map((page, index) => {
        return (
          <Fragment key={index}>
            {page.messages.map((message) => {
              const jwtToken = localStorage.getItem("access_token");
              const { sub }: { sub: string } = jwtDecode(jwtToken!);
              return (
                <Fragment key={message.id}>
                  {sub === message.authorId ? (
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
