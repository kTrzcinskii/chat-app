import { ExtendedChatroom } from "../../utils/server-responses-types/ChatroomsCursor";

interface CurrentChatroomProps {
  chatroomInfo: ExtendedChatroom | null;
}

const CurrentChatroom: React.FC<CurrentChatroomProps> = ({ chatroomInfo }) => {
  console.log(chatroomInfo);
  return (
    <div className='w-full min-h-full border-l-2 border-white'>
      CHATROOM {chatroomInfo?.name}
    </div>
  );
};

export default CurrentChatroom;
