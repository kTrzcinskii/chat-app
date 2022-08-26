import { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <div className='px-8 md:px-12 py-6 md:py-10 w-[340px] sm:w-[420px] md:w-[500px] rounded-lg justify-center items-center bg-my-dark-dark'>
      {children}
    </div>
  );
};

export default FormContainer;
