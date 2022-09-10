interface MessagesContainerProps {
  inputHeight: number;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({
  inputHeight,
}) => {
  return (
    <div
      className='w-full bg-red-500'
      style={{ height: `calc(100% - ${inputHeight}px)` }}
    >
      messages
    </div>
  );
};

export default MessagesContainer;
