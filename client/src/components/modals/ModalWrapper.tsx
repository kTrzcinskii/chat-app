import { ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ModalWrapperProps {
  isVisible: boolean;
  closeModal: () => void;
  children?: ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isVisible,
  children,
  closeModal,
}) => {
  return (
    <div
      className='h-screen w-screen bg-black/50 absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center overflow-x-hidden'
      style={{ opacity: isVisible ? 100 : 0, zIndex: isVisible ? 10 : -100 }}
    >
      <div className='px-8 md:px-12 py-6 md:py-10 w-[340px] sm:w-[420px] md:w-[500px] rounded-lg justify-center items-center bg-my-dark-dark relative max-h-[90%] overflow-y-scroll no-scrollbar'>
        <div
          className='absolute top-3 right-3 hover:scale-110 cursor-pointer transition-all duration-150 ease-in-out text-red-500'
          onClick={closeModal}
        >
          <AiOutlineClose size={26} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
