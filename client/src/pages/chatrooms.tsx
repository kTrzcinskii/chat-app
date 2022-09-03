import type { NextPage } from "next";
import ChatroomsContainer from "../components/chatroom/ChatroomsContainer";
import CurrentChatroom from "../components/chatroom/CurrentChatroom";

const Chatrooms: NextPage = () => {
  return (
    <div className='flex flex-row h-screen max-h-screen overflow-y-hidden'>
      <div className='w-full min-h-full lg:w-[450px] flex'>
        <ChatroomsContainer />
      </div>
      <div className='hidden lg:flex'>
        <CurrentChatroom />
      </div>
    </div>
  );
};

export default Chatrooms;
