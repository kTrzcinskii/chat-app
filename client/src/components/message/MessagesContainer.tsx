import jwtDecode from "jwt-decode";
import { Fragment } from "react";
import useGetChatroomMessages from "../../hooks/query/useGetChatroomMessages";
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
  const { data, fetchNextPage } = useGetChatroomMessages(chatroomId, 3);

  console.log(data?.pages);

  return (
    <div
      className='w-full overflow-x-hidden overflow-y-scroll no-scrollbar flex flex-col-reverse'
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
      <button onClick={() => fetchNextPage()}>fetc</button>
    </div>
  );
};

export default MessagesContainer;
