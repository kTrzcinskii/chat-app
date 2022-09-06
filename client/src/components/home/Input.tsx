import {
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
} from "react";
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<any>;
  registerName: string;
  errors: FieldErrorsImpl<any>;
  lightMode?: boolean;
}

const Input: React.FC<InputProps> = ({
  setShowPassword = () => console.log(),
  register,
  registerName,
  errors,
  icon,
  id,
  label,
  lightMode = false,
  ...props
}) => {
  const isError = errors[registerName] ? true : false;
  const errorMessage = String(errors[registerName]?.message) ?? "Error";

  const primaryText = lightMode ? "text-zinc-600" : "text-white";
  const primaryBorder = lightMode ? "border-zinc-600" : "border-white";

  return (
    <div
      className={`space-y-2 ${primaryText} focus-within:text-my-cyan-light ${
        isError && "!text-red-400"
      }`}
    >
      <label className='ml-1 text-lg text-inherit' htmlFor={id}>
        {label}
      </label>
      <div className='relative'>
        <input
          id={id}
          {...props}
          className={`bg-inherit appearance-none border-2 ${primaryBorder} focus:border-my-cyan-light rounded-lg w-full py-2 px-3 ${primaryText} leading-tight focus:outline-none transition-all duration-100 ease-in-out ${
            isError && "!border-red-400"
          }`}
          {...register(registerName)}
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
      {isError && <p className='ml-1'>{errorMessage}</p>}
    </div>
  );
};

export default Input;
