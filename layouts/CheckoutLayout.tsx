import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import lavidluxeLogo from 'assets/images/logo-two.png'
import { OrderInformation } from 'components/OrderInformation'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'

export const CheckoutLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter()

  return (
    <main className='grid min-h-screen grid-cols-1 overflow-x-hidden transition-all md:grid-cols-5'>
      <section className='order-2 col-span-3 px-4 py-10 md:order-1 lg:px-10 lg:py-20 xl:pl-40 xl:pr-20'>
        <header>
          <button
            onClick={() => router.push('/shop/women-wears')}
            className='flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs text-[#333333] transition-all hover:opacity-80 active:scale-[0.98]'>
            <ArrowLeftIcon className='h-4 w-4' />
            <span>Back to shop</span>
          </button>

          <h1 className='mt-2 flex items-center gap-2 font-vollkorn text-lg font-bold uppercase tracking-wide text-[#333333] md:text-2xl'>
            <Image
              alt='lavidluxe logo'
              src={lavidluxeLogo}
              className='w-7 opacity-90'
            />
            <span>Lavidluxe Clothings</span>
          </h1>
        </header>

        {children}

        <div className='mt-14 border-t border-t-gray-200'>
          <p className='pt-3 text-xs'>
            All rights reserved. &copy; {new Date().getFullYear()}{' '}
            <Link href='/'>Lavidluxe Clothings</Link>
          </p>
        </div>
      </section>

      <OrderInformation />
    </main>
  )
}
