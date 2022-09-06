import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegister<any>;
  registerName: string;
}

const RadioInput: React.FC<RadioInputProps> = ({
  label,
  register,
  registerName,
  id,
  ...props
}) => {
  return (
    <div className='flex items-center'>
      <input
        {...props}
        type='radio'
        id={id}
        {...register(registerName)}
        className='appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-my-blue-dark checked:border-my-blue-dark focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
      />
      <label htmlFor={id} className='ml-2 font-medium text-zinc-600'>
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
