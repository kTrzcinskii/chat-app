import type { NextPage } from "next";
import Link from "next/link";

const NotFound: NextPage = () => {
  return (
    <div className='min-h-screen w-screen flex justify-center items-center flex-col text-my-blue-light font-semibold space-y-6'>
      <h1 className='text-6xl'>Page Not Found</h1>
      <Link passHref href={"/"}>
        <a className='text-xl text-my-cyan-light hover:underline'>
          Go to Home Page
        </a>
      </Link>
    </div>
  );
};

export default NotFound;
