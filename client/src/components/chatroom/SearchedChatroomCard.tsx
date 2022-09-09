import getButtonText from "../../utils/helpers/getButtonText";
import { ChatroomWithStatus } from "../../utils/server-responses-types/ChatroomByName";
import Avatar from "../utils/Avatar";
import default_group_img from "../../../public/images/basic_chatroom_avatar.png";
import getShortMessage from "../../utils/helpers/getShortMessage";
import { useState } from "react";
import { format } from "date-fns";
import useJoinChatroom from "../../hooks/mutation/useJoinChatroom";
import axios from "axios";
import { useRouter } from "next/router";
import useAcceptInvitation from "../../hooks/mutation/useAcceptInvitation";
import useSendRequest from "../../hooks/mutation/useSendRequest";
import useDeleteRequest from "../../hooks/mutation/useDeleteRequest";

interface TextWithSpanProps {
  name: string;
  value: string | number;
}

const TextWithSpan: React.FC<TextWithSpanProps> = ({ name, value }) => {
  return (
    <p className='text-lg text-gray-300'>
      {name}: <span className='text-white'>{value}</span>
    </p>
  );
};

const SearchedChatroomCard: React.FC<
  ChatroomWithStatus & { refetch: () => void }
> = ({
  name,
  status,
  privacyMode,
  createdAt,
  invitation,
  request,
  id,
  refetch,
}) => {
  const btnText = getButtonText(status, privacyMode);
  const [showMore, setShowMore] = useState(false);

  const router = useRouter();

  const btnOnClick = () => {
    switch (btnText) {
      case "Join Chatroom":
        joinChatroomMutate(
          { chatroomId: id },
          {
            onError: (e) => {
              if (axios.isAxiosError(e) && e.response?.status === 401) {
                router.push("/unauthorized");
              }
              throw new Error(e.message);
            },
            onSuccess: () => {
              refetch();
            },
          }
        );
        break;
      case "Accept Invitation":
        acceptInvitationMutate(
          { invitationId: invitation!.id },
          {
            onError: (e) => {
              if (axios.isAxiosError(e) && e.response?.status === 401) {
                router.push("/unauthorized");
              }
              throw new Error(e.message);
            },
            onSuccess: () => {
              refetch();
            },
          }
        );
        break;
      case "Send Request":
        sendRequestMutate(
          { chatroomId: id },
          {
            onError: (e) => {
              if (axios.isAxiosError(e) && e.response?.status === 401) {
                router.push("/unauthorized");
              }
              throw new Error(e.message);
            },
            onSuccess: () => {
              refetch();
            },
          }
        );
        break;
      default:
        break;
    }
  };

  const { mutate: joinChatroomMutate } = useJoinChatroom();
  const { mutate: acceptInvitationMutate } = useAcceptInvitation();
  const { mutate: sendRequestMutate } = useSendRequest();
  const { mutate: deleteRequestMutate } = useDeleteRequest();

  //todo: add functionality to all the buttons in this component
  return (
    <div className='bg-my-blue-dark w-[350px] text-white flex flex-col items-center px-3 py-2 rounded-lg space-y-3'>
      <div className='w-full flex flex-row items-center justify-between'>
        <div className='flex flex-row space-x-2 cursor-pointer'>
          <Avatar img_src={default_group_img} size={45} />
          <div className='flex flex-col justify-center'>
            <p className='text-gray-200 text-sm'>{privacyMode}</p>
            <h3
              className='font-semibold hover:underline'
              onClick={() => setShowMore((prev) => !prev)}
            >
              {getShortMessage(name, 12)}
            </h3>
          </div>
        </div>
        <button
          className='btn text-center text-my-blue-dark bg-white disabled:bg-gray-300 hover:bg-gray-200 active:bg-gray-300 min-w-[146px]'
          disabled={btnText === "Request Sent"}
          onClick={btnOnClick}
        >
          {btnText}
        </button>
      </div>
      {showMore && (
        <div className='w-[90%]'>
          <TextWithSpan name='Full name' value={name} />
          <TextWithSpan
            name='Created on'
            value={format(new Date(createdAt), "dd.MM.yyyy")}
          />
          {invitation && (
            <>
              <TextWithSpan
                name='Invited by'
                value={invitation.invitedBy.username}
              />
              <TextWithSpan
                name='Invited on'
                value={format(new Date(invitation.createdAt), "dd.MM.yyyy")}
              />
              <div className='w-full flex justify-center items-center'>
                <button className='btn bg-red-500 hover:bg-red-600 active:bg-red-700 mt-2'>
                  Delete Invitation
                </button>
              </div>
            </>
          )}
          {request && (
            <>
              <TextWithSpan
                name='Request sent on'
                value={format(new Date(request.createdAt), "dd.MM.yyyy")}
              />
              <div className='w-full flex justify-center items-center'>
                <button
                  className='btn bg-red-500 hover:bg-red-600 active:bg-red-700 mt-2'
                  onClick={() => {
                    deleteRequestMutate(
                      { requestId: request.id },
                      {
                        onError: (e) => {
                          if (
                            axios.isAxiosError(e) &&
                            e.response?.status === 401
                          ) {
                            router.push("/unauthorized");
                          }
                          throw new Error(e.message);
                        },
                        onSuccess: () => {
                          refetch();
                        },
                      }
                    );
                  }}
                >
                  Cancel Request
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchedChatroomCard;
