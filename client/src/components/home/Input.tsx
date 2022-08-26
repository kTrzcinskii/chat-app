import {
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
}

const Input: React.FC<InputProps> = ({
  setShowPassword = () => console.log(),
  icon,
  id,
  label,
  ...props
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const labelTextColor = isInputFocused ? "text-my-cyan-light" : "text-white";

  return (
    <div className='space-y-2'>
      <label className={`ml-1 text-lg ${labelTextColor}`} htmlFor={id}>
        {label}
      </label>
      <div className='relative'>
        <input
          id={id}
          {...props}
          className='bg-inherit appearance-none border-2 border-white focus:border-my-cyan-light rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none transition-all duration-100 ease-in-out'
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <div className='absolute right-0 top-0 pr-2 h-full flex items-center'>
          <button
            className='text-white hover:text-my-cyan-light transition-all duration-200 ease-in-out'
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {icon}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
