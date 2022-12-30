import { useAtom } from 'jotai'
import { Layout } from 'layouts/Layout'
import Link from 'next/link'
import { ReactElement } from 'react'
import { openCartDrawer } from 'store/drawerAtom'

const ServerError = () => {
  const [openCart] = useAtom(openCartDrawer)

  return (
    <Layout>
      <main
        className={`bg-gray-200 min-h-screen transition-all px-4 md:px-16 flex flex-col items-center justify-center text-sm lg:text-base text-center ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <h2 className='font-vollkorn font-bold text-2xl md:text-4xl lg:text-6xl text-gray-700'>
          500 - Something went wrong
        </h2>
        <p className='pt-2'>
          Our developers have been notified that something went wrong.
        </p>
        <p>You can continue using the site while we are working on it.</p>
        <Link
          href='/'
          className='rounded flex justify-center bg-[#333333] text-white py-4 px-10 text-xs font-bold uppercase tracking-[5px] transition-all hover:border-main hover:bg-main active:scale-95 mt-10'>
          Return home
        </Link>
      </main>
    </Layout>
  )
}

ServerError.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default ServerError
