import errorIlustration from 'assets/images/404-error.svg'
import { useAtom } from 'jotai'
import { Layout } from 'layouts/Layout'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'
import { openCartDrawer } from 'store/atoms'

const NotFound = () => {
  const [openCart] = useAtom(openCartDrawer)
  // const router = useRouter()
  // console.log('router', router)
  // TODO: check if there is a previous page, and if there is instead of taking the user to the homepage return them to the previous page

  return (
    <>
      <NextSeo title='404' />

      <main
        className={`flex min-h-screen flex-col items-center justify-center px-4 text-center text-sm transition-all md:flex-row md:px-16 lg:text-base xl:gap-20 ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <Image src={errorIlustration} alt='error illustration' />

        <div className='max-w-[70ch] text-center lg:text-left'>
          <h2 className='font-vollkorn text-2xl font-bold text-gray-700 md:text-4xl lg:text-6xl'>
            Looks like you are lost
          </h2>
          <p className='pt-2'>
            Maybe this page used to exist or you just spelled something wrong.
          </p>
          <p>
            Chances are you spelled something wrong, so can you double check the
            URL?
          </p>
          <Link
            href='/'
            className='mx-auto mt-10 flex w-max justify-center rounded bg-[#333333] py-4 px-10 text-xs font-bold uppercase tracking-[5px] text-white transition-all hover:border-main hover:bg-main active:scale-[0.98] lg:mx-0'>
            Return home
          </Link>
        </div>
      </main>
    </>
  )
}

NotFound.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default NotFound
