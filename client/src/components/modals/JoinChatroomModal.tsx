import { useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useInView } from "react-intersection-observer";
import useGetChatroomsByName from "../../hooks/query/useGetChatroomsByName";
import SearchedChatroomCard from "../chatroom/SearchedChatroomCard";
import ErrorMsg from "../utils/ErrorMsg";
import Spinner from "../utils/Spinner";
import ModalWrapper from "./ModalWrapper";

interface JoinChatroomModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

const JoinChatroomModal: React.FC<JoinChatroomModalProps> = ({
  isVisible,
  closeModal,
}) => {
  const [lastClickedId, setLastClickedId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCleared, setIsCleared] = useState(false);
  const [isError, setIsError] = useState(false);
  const {
    data,
    refetch,
    isFetching,
    isError: isApiError,
    error,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useGetChatroomsByName(searchTerm, 15);
  const queryClient = useQueryClient();

  const { ref: fetcherRef, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  const errorClasses = "!border-red-500 focus:outline-red-500";

  return (
    <ModalWrapper closeModal={closeModal} isVisible={isVisible}>
      <div>
        <h1 className='w-full text-center text-3xl text-my-blue-dark mb-8'>
          Search for chatrooms:
        </h1>
        <div className='flex flex-row space-x-2 justify-center'>
          <div>
            <input
              type='text'
              className={`text-white bg-inherit shadow appearance-none rounded w-[250px] py-2 px-3 leading-tight border-2 border-white focus:border-my-blue-dark focus:outline-none focus:outline-my-blue-dark focus:outline-offset-0 focus:outline-[1px] placeholder:text-gray-300 ${
                isError && errorClasses
              }`}
              value={inputValue}
              onChange={(e) => {
                if (isError) {
                  setIsError(false);
                }
                setIsCleared(true);
                queryClient.removeQueries(["chatrooms-by-name"]);
                setInputValue(e.currentTarget.value);
              }}
              placeholder='Enter name...'
            />
            {isError && (
              <p className='text-sm ml-1 text-red-500'>Name is required</p>
            )}
          </div>
          <button
            className='btn my-bg-blue h-[40px]'
            onClick={() => {
              if (inputValue === "") {
                setIsError(true);
                return;
              }
              setIsCleared(false);
              flushSync(() => {
                setSearchTerm(inputValue);
              });
              queryClient.removeQueries(["chatrooms-by-name"]);
              refetch();
            }}
          >
            Search
          </button>
        </div>
        <div className='flex flex-col items-center justify-center space-y-4 pt-4'>
          {data?.pages.map((page, index) => {
            return (
              <Fragment key={index}>
                {page.chatrooms.map((chatroom) => {
                  return (
                    <Fragment key={chatroom.id}>
                      <SearchedChatroomCard
                        {...chatroom}
                        refetch={refetch}
                        isLoading={isFetching}
                        lastClickedId={lastClickedId}
                        setLastClickedId={setLastClickedId}
                      />
                    </Fragment>
                  );
                })}
              </Fragment>
            );
          })}
          <div ref={fetcherRef} />
        </div>
        {isFetching && <Spinner />}
        {isApiError && (
          <div className='relative py-10'>
            <ErrorMsg message={error.message} />
          </div>
        )}
        {isSuccess &&
          inputValue !== "" &&
          data.pages[0]?.chatrooms.length === 0 &&
          !isCleared && (
            <div className='w-full flex flex-col justify-center items-center space-y-2'>
              <p className='text-center text-my-blue-light text-lg'>
                There is no chatroom with provided name.
              </p>
              <button
                className='appearance-none text-red-500 text-lg hover:underline'
                onClick={() => {
                  setIsCleared(true);
                  setInputValue("");
                }}
              >
                Clear input
              </button>
            </div>
          )}
      </div>
    </ModalWrapper>
  );
};

export default JoinChatroomModal;
