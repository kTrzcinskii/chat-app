import ModalWrapper from "./ModalWrapper";

interface JoinChatroomModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

const JoinChatroomModal: React.FC<JoinChatroomModalProps> = ({
  isVisible,
  closeModal,
}) => {
  return (
    <ModalWrapper closeModal={closeModal} isVisible={isVisible}>
      <div>
        <h1 className='w-full text-center text-3xl text-my-blue-dark mb-8'>
          Search for chatrooms:
        </h1>
        <div className='flex flex-row space-x-2 justify-center'>
          <input
            type='text'
            className='bg-inherit shadow appearance-none rounded w-[250px] py-2 px-3 text-my-dark-dark leading-tight border-2 border-white focus:border-my-blue-dark focus:outline-none focus:outline-my-blue-dark focus:outline-offset-0 focus:outline-[1px] placeholder:text-my-dark-dark'
          />
          <button className='btn my-bg-blue'>Search</button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default JoinChatroomModal;
