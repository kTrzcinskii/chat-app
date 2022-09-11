import MessagesWithAuthor from "../../utils/interfaces/MessagesWithAuthor";
import Avatar from "../utils/Avatar";
import getMessageTime from "../../utils/helpers/getMessageTime";
import default_user_img from "../../../public/images/basic_user_avatar.png";

const SomeoneMessage: React.FC<MessagesWithAuthor> = ({
  content,
  createdAt,
  author,
}) => {
  return (
    <div className='w-full flex items-start flex-col pl-1'>
      <p className='text-gray-300 text-xs w-full ml-[48px]'>
        {author.username} - {getMessageTime(createdAt)}
      </p>
      <div className='flex flex-row space-x-1 max-w-[80%] mb-2'>
        <div>
          <Avatar img_src={default_user_img} size={40} />
        </div>
        <div className='bg-my-gray-light rounded-xl px-2 py-2 '>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default SomeoneMessage;
