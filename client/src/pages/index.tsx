import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chat app</title>
        <meta name='description' content='Chat app by Kacper Trzciński' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto flex flex-col items-center justify-center min-h-screen p-4'>
        <h1>hello</h1>
      </main>
    </>
  );
};

export default Home;
