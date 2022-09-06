import Input from "../utils/Input";
import ModalWrapper from "./ModalWrapper";
import { useForm } from "react-hook-form";
import {
  CreateChatroomSchema,
  ICreateChatroomSchema,
} from "../../utils/schemas/CreateChatroomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import RadioInput from "../utils/RadioInput";

interface CreateChatroomModalInterface {
  isVisible: boolean;
  closeModal: () => void;
}

const CreateChatroomModal: React.FC<CreateChatroomModalInterface> = ({
  isVisible,
  closeModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ICreateChatroomSchema>({
    resolver: zodResolver(CreateChatroomSchema),
  });

  console.log(errors);

  const onSubmit = (values: ICreateChatroomSchema) => {
    console.log(values);
  };

  return (
    <ModalWrapper isVisible={isVisible} closeModal={closeModal}>
      <div>
        <h1 className='w-full text-center text-3xl text-my-blue-dark mb-8'>
          Create New Chatroom
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col w-full space-y-3 max-w-[350px] mx-auto'>
            <Input
              label='Name'
              placeholder='Enter name...'
              id='name'
              register={register}
              registerName='name'
              errors={errors}
              lightMode
            />
            <div>
              <h3 className='text-lg ml-1 text-zinc-600 mb-2'>
                Choose privacy:
              </h3>
              <div className='flex w-full justify-around'>
                <RadioInput
                  label='Public'
                  register={register}
                  registerName='privacy'
                  id='public-radio'
                  checked
                  value='PUBLIC'
                />
                <RadioInput
                  label='Private'
                  register={register}
                  registerName='privacy'
                  id='private-radio'
                  value='PRIVATE'
                />
              </div>
            </div>
            <div className='w-full flex justify-center items-center pt-5'>
              <button className='btn my-bg-blue w-[150px]' type='submit'>
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default CreateChatroomModal;
