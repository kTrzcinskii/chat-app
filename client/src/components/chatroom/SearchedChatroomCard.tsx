import getButtonText from "../../utils/helpers/getButtonText";
import { ChatroomWithStatus } from "../../utils/server-responses-types/ChatroomByName";
import Avatar from "../utils/Avatar";

import default_group_img from "../../../public/images/basic_chatroom_avatar.png";
import getShortMessage from "../../utils/helpers/getShortMessage";

const SearchedChatroomCard: React.FC<ChatroomWithStatus> = ({
  name,
  status,
  privacyMode,
}) => {
  const btnText = getButtonText(status, privacyMode);

  //todo: toggle on click to expand and show more info about chatroom
  return (
    <div className='bg-my-blue-dark w-[350px] text-white flex flex-row items-center justify-between px-3 py-2 rounded-lg'>
      <div className='flex flex-row space-x-2'>
        <Avatar img_src={default_group_img} />
        <div className='flex flex-col'>
          <p className='text-gray-200 text-sm'>{privacyMode}</p>
          <h3 className='font-semibold'>{getShortMessage(name, 14)}</h3>
        </div>
      </div>
      <button
        className='btn text-right text-my-blue-dark bg-white disabled:bg-gray-300 hover:bg-gray-100 active:bg-gray-200'
        disabled={btnText === "Request Sent"}
      >
        {btnText}
      </button>
    </div>
  );
};

export default SearchedChatroomCard;
