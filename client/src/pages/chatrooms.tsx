import type { NextPage } from "next";
import { useState } from "react";
import ChatroomsContainer from "../components/chatroom/ChatroomsContainer";
import CurrentChatroom from "../components/chatroom/CurrentChatroom";
import { ExtendedChatroom } from "../utils/server-responses-types/ChatroomsCursor";

const Chatrooms: NextPage = () => {
  const [currentChatroomInfo, setCurrentChatroomInfo] =
    useState<ExtendedChatroom | null>(null);
  return (
    <div className='flex flex-row h-screen max-h-screen overflow-y-hidden'>
      <div className='w-full min-h-full lg:w-[450px] flex'>
        <ChatroomsContainer setCurrentChatroomInfo={setCurrentChatroomInfo} />
      </div>
      <div className='hidden lg:flex'>
        <CurrentChatroom chatroomInfo={currentChatroomInfo} />
      </div>
    </div>
  );
};

export default Chatrooms;
