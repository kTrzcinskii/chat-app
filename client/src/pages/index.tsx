import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chat app</title>
        <meta name='description' content='Chat app by Kacper Trzciński' />
      </Head>

      <main className='w-full flex flex-col items-center justify-center min-h-screen p-4'>
        <h1 className='text-6xl font-semibold text-my-blue-light'>Chat App</h1>
        <div className='flex flex-row space-x-4 pt-12'>
          <Link passHref href='/login'>
            <button className='btn my-bg-blue text-xl min-w-[98px]'>
              Login
            </button>
          </Link>
          <Link passHref href='/register'>
            <button className='btn my-bg-blue text-xl min-w-[98px]'>
              Register
            </button>
          </Link>
        </div>
        <div className='absolute bottom-8 pt-8'>
          <h3 className='text-my-gray-light text-xl'>
            Created by{" "}
            <a
              href='https://github.com/kTrzcinskii'
              className='text-my-cyan hover:underline'
              target='_blank'
              rel='noreferrer'
            >
              Kacper Trzciński
            </a>
          </h3>
        </div>
      </main>
    </>
  );
};

export default Home;
