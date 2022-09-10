import { FiSend } from "react-icons/fi";
import { RiSendPlaneFill } from "react-icons/ri";

interface MessageInputProps {
  chatroomId: string;
  inputHeight: number;
}

const MessageInput: React.FC<MessageInputProps> = ({
  chatroomId,
  inputHeight,
}) => {
  return (
    <div
      className='w-full flex flex-row items-center justify-between'
      style={{ height: inputHeight }}
    >
      <textarea className='w-full appearance-none mx-2 p-2 text-white bg-inherit shadow rounded border-2 border-white focus:border-my-cyan-light focus:outline-none focus:outline-my-cyan-light focus:outline-offset-0 focus:outline-[1px] placeholder:text-gray-300 resize-none no-scrollbar h-[44px]' />
      <button className='text-my-cyan-light hover:text-my-cyan-dark transition-all duration-200 ease-in-out mr-2'>
        <RiSendPlaneFill size={38} />
      </button>
    </div>
  );
};

export default MessageInput;
