interface ErrorMsgProps {
  message?: string;
}

const ErrorMsg: React.FC<ErrorMsgProps> = ({
  message = "Server error, please try again later",
}) => {
  return (
    <div className='flex w-full justify-center items-center flex-col space-y-4 bg-inherit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <h1 className='text-4xl text-my-blue-light'>Error</h1>
      <p className='text-lg text-my-cyan-light'>{message}</p>
    </div>
  );
};

export default ErrorMsg;
