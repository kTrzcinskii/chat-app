import { ExtendedChatroom } from "../../utils/server-responses-types/ChatroomsCursor";
import { BsThreeDots } from "react-icons/bs";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput";
import Spinner from "../utils/Spinner";

interface CurrentChatroomProps {
  chatroomInfo: ExtendedChatroom | null;
}

const CurrentChatroom: React.FC<CurrentChatroomProps> = ({ chatroomInfo }) => {
  const MESSAGE_INPUT_HEIGHT = 65;

  if (chatroomInfo === null) {
    return <Spinner centered />;
  }

  return (
    <div className='w-full min-h-full flex flex-row'>
      <div className='h-full w-full flex flex-col'>
        <div className='flex flex-row justify-between items-center px-10 py-5 h-[122px] border-b-2 border-my-cyan-light'>
          <h4 className='text-white text-3xl'>{chatroomInfo?.name}</h4>
          <button
            className='text-my-cyan-light hover:scale-125 transition-all duration-200 ease-in-out'
            onClick={() => console.log("todo")}
          >
            <BsThreeDots size={36} />
          </button>
        </div>
        <div
          className='relative w-full'
          style={{ height: "calc(100% - 122px)" }}
        >
          <MessagesContainer
            inputHeight={MESSAGE_INPUT_HEIGHT}
            chatroomId={chatroomInfo.id}
          />
          <MessageInput
            inputHeight={MESSAGE_INPUT_HEIGHT}
            chatroomId={chatroomInfo.id}
          />
        </div>
      </div>
      <div className='hidden xl:flex flex-col h-full xl:w-[400px] bg-my-dark-very-dark'>
        <h4 className='w-full text-center text-my-cyan-light text-2xl mt-4'>
          Active Users: <br></br>TODO
        </h4>
      </div>
    </div>
  );
};

export default CurrentChatroom;
