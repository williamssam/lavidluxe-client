import { ArrowLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import lavidluxeLogo from '../assets/images/logo-two.png'
import { OrderInformation } from '../components/OrderInformation'

type CheckoutLayoutProps = {
  children: React.ReactNode
}

export const CheckoutLayout = ({ children }: CheckoutLayoutProps) => {
  const router = useRouter()

  return (
    <main className='min-h-screen transition-all grid grid-cols-1 md:grid-cols-5 overflow-x-hidden'>
      <section className='px-4 lg:px-10 xl:pl-40 xl:pr-20 py-10 lg:py-20 col-span-3'>
        <button
          onClick={() => router.push('/')}
          className='flex items-center gap-1 bg-gray-100 text-[#333333] px-2 py-1 text-xs rounded transition-all active:scale-95 hover:opacity-80'>
          <ArrowLeftIcon className='w-4 h-4' />
          <span>Return home</span>
        </button>

        <h1 className='font-vollkorn font-bold text-2xl flex items-center gap-2 uppercase tracking-wide text-[#333333] mt-2'>
          <Image
            alt='lavidluxe logo'
            src={lavidluxeLogo}
            className='w-7 opacity-90'
          />
          <Link href='/'>Lavidluxe</Link>
        </h1>

        {/* form steps */}
        <p className='text-[0.6rem] pt-1 flex items-center gap-2'>
          <Link
            href='/checkout/information'
            className={`${
              router.asPath === '/checkout/information'
                ? 'text-white font-black uppercase tracking-widest bg-main py-1 px-3 rounded'
                : 'text-gray-700 font-bold uppercase tracking-widest pl-1'
            }`}>
            Information
          </Link>
          <ChevronRightIcon className='w-4 h-4' />
          <Link
            href='/checkout/shipping'
            className={`${
              router.asPath === '/checkout/shipping'
                ? 'text-white font-black uppercase tracking-widest bg-main py-1 px-3 rounded'
                : 'text-gray-700 font-bold uppercase tracking-widest pl-1'
            }`}>
            Shipping
          </Link>
          <ChevronRightIcon className='w-4 h-4' />
          <span className='text-gray-700 font-bold uppercase tracking-widest pl-1'>
            Payment
          </span>
        </p>

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
