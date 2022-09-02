import { ImSpinner5 } from "react-icons/im";

const Spinner: React.FC = () => {
  return (
    <div className='flex w-full justify-center items-center text-white bg-inherit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <ImSpinner5 className='animate-spin' size={60} />
    </div>
  );
};

export default Spinner;
