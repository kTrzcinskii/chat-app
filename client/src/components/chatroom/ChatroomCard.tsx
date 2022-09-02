import { ExtendedChatroom } from "../../utils/server-responses-types/ChatroomsCursor";

import chatroom_avatar from "../../../public/images/basic_chatroom_avatar.png";
import Avatar from "../utils/Avatar";

const ChatroomCard: React.FC<ExtendedChatroom> = ({ name, lastMessage }) => {
  return (
    <div className='w-full py-7 px-6 flex flex-row justify-between items-end bg-my-dark border-b-2 border-white'>
      <div className='flex flex-row items-center'>
        <Avatar img_src={chatroom_avatar} />
        <div className='ml-4 flex flex-col'>
          <h3 className='text-white text-xl mb-2'>{name}</h3>
          {lastMessage?.content && (
            <p className='text-gray-300'>
              {lastMessage?.username}: {lastMessage?.content}
            </p>
          )}
        </div>
      </div>
      {lastMessage?.createdAt && (
        <div className='flex items-end h-full'>
          <p className='text-gray-300'>{lastMessage?.createdAt}</p>
        </div>
      )}
    </div>
  );
};

export default ChatroomCard;
