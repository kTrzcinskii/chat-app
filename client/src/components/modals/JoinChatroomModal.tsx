import { useQueryClient } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import useGetChatroomsByName from "../../hooks/query/useGetChatroomsByName";
import SearchedChatroomCard from "../chatroom/SearchedChatroomCard";
import ModalWrapper from "./ModalWrapper";

interface JoinChatroomModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

const JoinChatroomModal: React.FC<JoinChatroomModalProps> = ({
  isVisible,
  closeModal,
}) => {
  const [inputValue, setInputValue] = useState("");
  const { data, refetch } = useGetChatroomsByName(inputValue, 15);
  const queryClient = useQueryClient();

  console.log(data);

  //todo: message when no chatroom found && when input === ""
  return (
    <ModalWrapper closeModal={closeModal} isVisible={isVisible}>
      <div>
        <h1 className='w-full text-center text-3xl text-my-blue-dark mb-8'>
          Search for chatrooms:
        </h1>
        <div className='flex flex-row space-x-2 justify-center'>
          <input
            type='text'
            className='text-white bg-inherit shadow appearance-none rounded w-[250px] py-2 px-3 leading-tight border-2 border-white focus:border-my-blue-dark focus:outline-none focus:outline-my-blue-dark focus:outline-offset-0 focus:outline-[1px] placeholder:text-gray-300'
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            placeholder='Enter name...'
          />
          <button
            className='btn my-bg-blue'
            onClick={() => {
              queryClient.removeQueries(["chatrooms-by-name"]);
              refetch();
            }}
          >
            Search
          </button>
        </div>
        <div className='flex flex-col items-center justify-center space-y-3 pt-4'>
          {data?.pages.map((page, index) => {
            return (
              <Fragment key={index}>
                {page.chatrooms.map((chatroom) => {
                  return (
                    <Fragment key={chatroom.id}>
                      <SearchedChatroomCard {...chatroom} />
                    </Fragment>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default JoinChatroomModal;
