import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import useSendMessage from "../../hooks/mutation/useSendMessage";

interface MessageInputProps {
  chatroomId: string;
  inputHeight: number;
}

const MessageInput: React.FC<MessageInputProps> = ({
  chatroomId,
  inputHeight,
}) => {
  const [message, setMessage] = useState("");

  const { mutate } = useSendMessage(chatroomId);
  const router = useRouter();

  const handleSubmit = () => {
    if (message !== "") {
      mutate(
        { content: message },
        {
          onError: (e) => {
            if (axios.isAxiosError(e) && e.response?.status === 401) {
              router.push("/unauthorized");
            }
            throw new Error(e.message);
          },
        }
      );
    }
  };

  return (
    <form
      className='w-full flex flex-row items-center justify-between'
      style={{ height: inputHeight }}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        setMessage("");
      }}
    >
      <textarea
        className='w-full appearance-none mx-4 p-2 text-white bg-inherit shadow rounded border-2 border-white focus:border-my-cyan-light focus:outline-none focus:outline-my-cyan-light focus:outline-offset-0 focus:outline-[1px] placeholder:text-gray-300 resize-none no-scrollbar h-[44px]'
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
      />
      <button
        type='submit'
        className='text-my-cyan-light hover:text-my-cyan-dark transition-all duration-200 ease-in-out mr-3'
      >
        <RiSendPlaneFill size={36} />
      </button>
    </form>
  );
};

export default MessageInput;
