import type { NextPage } from "next";
import Link from "next/link";
import FormContainer from "../components/home/FormContainer";
import Input from "../components/home/Input";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  RegisterSchema,
  IRegisterSchema,
} from "../utils/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegister from "../hooks/mutation/useRegister";
import axios from "axios";

const Register: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const { mutate } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (values: IRegisterSchema) => {
    if (values.confirmPassword !== values.password) {
      setError("password", {
        message: "Passwords must match.",
      });
      setError("confirmPassword", {
        message: "Passwords must match.",
      });
      return;
    }
    mutate(values, {
      onSuccess: (r) => console.log(r.data),
      onError: (e) => {
        if (axios.isAxiosError(e)) {
          console.log(e.response?.data);
          //TODO: handle errors
          return;
        }
        throw new Error(e.message);
      },
    });
  };

  return (
    <div className='min-h-screen w-screen bg-my-gray-light flex justify-center items-center'>
      <FormContainer>
        <div className='space-y-8 md:space-y-10 lg:space-y-14'>
          <h1 className='w-full text-center text-6xl text-my-cyan-light'>
            Register
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col w-full space-y-3 max-w-[350px] mx-auto'>
              <Input
                label='Username'
                placeholder='Enter username...'
                id='username'
                register={register}
                registerName='username'
                errors={errors}
              />
              <Input
                id='password'
                label='Password'
                placeholder='Enter password...'
                icon={
                  showPassword ? (
                    <AiFillEyeInvisible size={26} />
                  ) : (
                    <AiFillEye size={26} />
                  )
                }
                setShowPassword={setShowPassword}
                type={showPassword ? "text" : "password"}
                register={register}
                registerName='password'
                errors={errors}
              />
              <Input
                id='confirm-password'
                label='Confirm Password'
                placeholder='Confirm password...'
                icon={
                  showPassword2 ? (
                    <AiFillEyeInvisible size={26} />
                  ) : (
                    <AiFillEye size={26} />
                  )
                }
                setShowPassword={setShowPassword2}
                type={showPassword2 ? "text" : "password"}
                register={register}
                registerName='confirmPassword'
                errors={errors}
              />
              <p className='pt-3 text-white'>
                Already have an account? Login{" "}
                <Link passHref href='/login'>
                  <a className='text-my-cyan-light hover:underline'>here</a>
                </Link>
                .
              </p>
              <div className='w-full flex justify-center items-center pt-5'>
                <button
                  type='submit'
                  className='btn my-bg-cyan text-xl min-w-[120px] py-2 text-my-dark-dark font-bold'
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </FormContainer>
    </div>
  );
};

export default Register;
