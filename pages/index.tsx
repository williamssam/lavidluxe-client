import Head from 'next/head'
import Link from 'next/link'
import { ReactElement } from 'react'
import { Layout } from '../components/Layout'

const Home = () => {
  return (
    <>
      <Head>
        <title>Home - Lavidluxe</title>
      </Head>

      <main className='flex min-h-screen items-center'>
        <h2 className='text-gray-400'>Welcome to our homepage.</h2>
        <Link
          href='/shop/all'
          className='mx-6 bg-[#333333] py-4 px-10 text-[0.7rem] font-bold uppercase tracking-[5px] text-white'>
          Start shopping now
        </Link>

        <Link
          href='/about-us'
          className='mx-6 bg-[#333333] py-4 px-10 text-[0.7rem] font-bold uppercase tracking-[5px] text-white'>
          About
        </Link>

        <Link
          href='/contact'
          className='mx-6 bg-[#333333] py-4 px-10 text-[0.7rem] font-bold uppercase tracking-[5px] text-white'>
          Contact
        </Link>
      </main>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
