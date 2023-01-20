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
      <section className='col-span-3 px-4 py-10 lg:px-10 lg:py-20 xl:pl-40 xl:pr-20'>
        <button
          onClick={() => router.push('/shop/all')}
          className='flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs text-[#333333] transition-all hover:opacity-80 active:scale-95'>
          <ArrowLeftIcon className='h-4 w-4' />
          <span>Back to shop</span>
        </button>

        <h1 className='mt-2 flex items-center gap-2 font-vollkorn text-2xl font-bold uppercase tracking-wide text-[#333333]'>
          <Image
            alt='lavidluxe logo'
            src={lavidluxeLogo}
            className='w-7 opacity-90'
          />
          <Link href='/'>Lavidluxe Clothing</Link>
        </h1>

        {children}

        <div className='mt-14 border-t border-t-gray-200'>
          <p className='pt-3 text-xs'>
            All rights reserved. &copy; {new Date().getFullYear()}{' '}
            <Link href='/'>lavidluxe.com</Link>
          </p>
        </div>
      </section>

      <OrderInformation />
    </main>
  )
}
