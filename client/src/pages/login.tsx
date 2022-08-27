import type { NextPage } from "next";
import Link from "next/link";
import FormContainer from "../components/home/FormContainer";
import Input from "../components/home/Input";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { LoginSchema, LoginSchemaType } from "../utils/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Login: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (values: LoginSchemaType) => {
    console.log(values);
  };

  return (
    <div className='min-h-screen w-screen bg-my-gray-light flex justify-center items-center'>
      <FormContainer>
        <div className='space-y-8 md:space-y-10 lg:space-y-14'>
          <h1 className='w-full text-center text-6xl text-my-cyan-light'>
            Login
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
              <p className='pt-3 text-white'>
                Don&apos;t have an account? Create one{" "}
                <Link passHref href='/register'>
                  <a className='text-my-cyan-light hover:underline'>here</a>
                </Link>
                .
              </p>
              <div className='w-full flex justify-center items-center pt-5'>
                <button className='btn my-bg-cyan text-xl min-w-[120px] py-2 text-my-dark-dark font-bold'>
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </FormContainer>
    </div>
  );
};

export default Login;
