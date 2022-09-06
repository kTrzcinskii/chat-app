import { ImSpinner5 } from "react-icons/im";

interface SpinnerProps {
  centered?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ centered = false }) => {
  const centeredClasses =
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";

  return (
    <div
      className={`flex w-full justify-center items-center text-white bg-inherit ${
        centered && centeredClasses
      }`}
    >
      <ImSpinner5 className='animate-spin py-4' size={60} />
    </div>
  );
};

export default Spinner;
