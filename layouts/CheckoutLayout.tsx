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
    <main className='min-h-screen transition-all grid grid-cols-1 md:grid-cols-5 overflow-x-hidden'>
      <section className='px-4 lg:px-10 xl:pl-40 xl:pr-20 py-10 lg:py-20 col-span-3'>
        <button
          onClick={() => router.push('/shop/all')}
          className='flex items-center gap-1 bg-gray-100 text-[#333333] px-2 py-1 text-xs rounded transition-all active:scale-95 hover:opacity-80'>
          <ArrowLeftIcon className='w-4 h-4' />
          <span>Back to shop</span>
        </button>

        <h1 className='font-vollkorn font-bold text-2xl flex items-center gap-2 uppercase tracking-wide text-[#333333] mt-2'>
          <Image
            alt='lavidluxe logo'
            src={lavidluxeLogo}
            className='w-7 opacity-90'
          />
          <Link href='/'>Lavidluxe</Link>
        </h1>

        {children}

        <div className='mt-14 border-t border-t-gray-200'>
          <p className='text-xs pt-3'>
            All rights reserved. &copy; {new Date().getFullYear()}{' '}
            <Link href='/'>lavidluxe.com</Link>
          </p>
        </div>
      </section>

      <OrderInformation />
    </main>
  )
}
