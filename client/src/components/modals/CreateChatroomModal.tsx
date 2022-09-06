import Input from "../home/Input";
import ModalWrapper from "./ModalWrapper";
import { useForm } from "react-hook-form";
import {
  CreateChatroomSchema,
  ICreateChatroomSchema,
} from "../../utils/schemas/CreateChatroomSchema";
import { zodResolver } from "@hookform/resolvers/zod";

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

  return (
    <ModalWrapper isVisible={isVisible} closeModal={closeModal}>
      <div>
        <h1 className='w-full text-center text-3xl text-my-cyan-light mb-8'>
          Create New Chatroom
        </h1>
        <form>
          <div className='flex flex-col w-full space-y-3 max-w-[350px] mx-auto'>
            <Input
              label='Name'
              placeholder='Enter name...'
              id='name'
              register={register}
              registerName='name'
              errors={errors}
              lightMode={true}
            />
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default CreateChatroomModal;
