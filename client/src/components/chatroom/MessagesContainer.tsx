import useGetChatroomMessages from "../../hooks/query/useGetChatroomMessages";

interface MessagesContainerProps {
  inputHeight: number;
  chatroomId: string;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({
  inputHeight,
  chatroomId,
}) => {
  const { data } = useGetChatroomMessages(chatroomId);

  console.log(data?.pages);

  return (
    <div
      className='w-full bg-red-500'
      style={{ height: `calc(100% - ${inputHeight}px)` }}
    >
      messages
    </div>
  );
};

export default MessagesContainer;
