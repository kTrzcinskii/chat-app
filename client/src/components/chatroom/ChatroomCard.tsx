import { ExtendedChatroom } from "../../utils/server-responses-types/ChatroomsCursor";
import Avatar from "../utils/Avatar";
import chatroom_avatar from "../../../public/images/basic_chatroom_avatar.png";
import getAppropriateTime from "../../utils/helpers/getAppropriateTime";
import getShortMessage from "../../utils/helpers/getShortMessage";
import { Dispatch, SetStateAction } from "react";

const ChatroomCard: React.FC<
  ExtendedChatroom & {
    setCurrentChatroomInfo: Dispatch<SetStateAction<ExtendedChatroom | null>>;
  }
> = ({
  name,
  lastMessage,
  createdAt,
  id,
  privacyMode,
  updatedAt,
  users,
  setCurrentChatroomInfo,
}) => {
  return (
    <div
      className='w-full py-7 px-6 flex flex-row justify-between items-end bg-my-dark cursor-pointer hover:bg-my-dark-dark transition-all duration-200 ease-in-out'
      onClick={() =>
        setCurrentChatroomInfo({
          createdAt,
          id,
          name,
          privacyMode,
          updatedAt,
          users,
          lastMessage,
        })
      }
    >
      <div className='flex flex-row items-center'>
        <Avatar img_src={chatroom_avatar} />
        <div className='ml-4 flex flex-col'>
          <h3 className='text-white text-xl mb-2'>{name}</h3>
          {lastMessage?.content ? (
            <p className='text-gray-300'>
              {lastMessage?.username}: {getShortMessage(lastMessage?.content)}
            </p>
          ) : (
            <p className='text-gray-300'>Start conversation now!</p>
          )}
        </div>
      </div>
      {lastMessage?.createdAt && (
        <div className='flex items-end h-full'>
          <p className='text-gray-300'>
            {getAppropriateTime(lastMessage?.createdAt)}
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatroomCard;
