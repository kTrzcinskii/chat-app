interface SendingMessageProps {
  content: string;
}

const SendingMessage: React.FC<SendingMessageProps> = ({ content }) => {
  return (
    <div className='w-full flex items-end flex-col pr-1'>
      <p className='text-gray-300 text-xs w-full text-right mr-1 italic'>
        Sending...
      </p>
      <div className='flex flex-row space-x-1 max-w-[80%] mb-2'>
        <div className='bg-my-cyan-light rounded-xl px-2 py-2 '>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default SendingMessage;
