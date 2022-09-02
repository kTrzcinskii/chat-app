import type { NextPage } from "next";
import Link from "next/link";

const UnauthorizedPage: NextPage = () => {
  return (
    <div className='min-h-screen w-screen flex justify-center items-center flex-col text-my-blue-light font-semibold space-y-6'>
      <h1 className='text-3xl text-center md:text-5xl'>
        This page is available only for authenticated users
      </h1>
      <Link passHref href={"/login"}>
        <a className='text-xl text-my-cyan-light hover:underline md:text-2xl'>
          Go to Login Page
        </a>
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
