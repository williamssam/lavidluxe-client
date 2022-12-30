import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { CheckoutNav } from 'components/CheckoutNav'
import { CheckoutLayout } from 'layouts/CheckoutLayout'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const Shipping = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Checkout - Lavidluxe</title>
      </Head>

      <CheckoutNav />

      <div className='text-xs border border-gray-300 rounded-lg py-4 px-4 md:px-6 mt-10 flex flex-col gap-4'>
        <div className='flex items-center justify-between border-b pb-3'>
          <div className='flex flex-col md:flex-row items-start md:items-center md:gap-10'>
            <p>Contact</p>
            <p className='font-bold'>williamsdamisamuel@outlook.com</p>
          </div>
          <button className='text-main font-bold' onClick={() => router.back()}>
            Change
          </button>
        </div>
        <div className='flex items-center justify-between border-b pb-3'>
          <div className='flex flex-col md:flex-row items-start md:items-center md:gap-10'>
            <p>Ship to</p>
            <p className='font-bold'>Lawal Bus Stop, Ikotun LA, Nigeria</p>
          </div>
          <button className='text-main font-bold' onClick={() => router.back()}>
            Change
          </button>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col md:flex-row items-start md:items-center md:gap-10'>
            <p>Method</p>
            <p className='font-bold'>
              Shipping outside Lagos cost additional 2,500
            </p>
          </div>
          <button></button>
        </div>
      </div>

      <div className='mt-14'>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between text-xs'>
          <h3 className='uppercase tracking-[4px] text-xs font-bold text-gray-700'>
            Payment
          </h3>
          <p>All transactions are secure and encrypted</p>
        </div>

        <div className='pt-5 flex flex-col gap-3 text-sm'>
          <label className='flex items-center gap-2'>
            <input
              type='radio'
              name='payment-type'
              id='payment-type'
              className='w-4 accent-main'
            />
            <span>Payment on delivery (POD)</span>
          </label>
          <label className='flex items-center gap-2'>
            <input
              type='radio'
              name='payment-type'
              id='payment-type'
              className='w-4 accent-main'
            />
            <span>Pay with card.</span>
          </label>
        </div>

        <footer className='flex flex-col md:flex-row items-center justify-between mt-10'>
          <button
            type='button'
            onClick={() => router.back()}
            className='text-sm flex items-center text-main transition-all py-1 px-2 rounded hover:bg-gray-50'>
            <ChevronLeftIcon className='w-7 h-7' />
            <span>Return to information</span>
          </button>
          <Link
            href='/checkout/order-successful'
            className='flex rounded justify-center bg-[#333333] text-white mt-3 md:mt-0 py-4 px-10 md:px-5 lg:px-10 text-xs font-bold uppercase w-full md:w-max tracking-[3px] lg:tracking-[4px] transition-all hover:border-main hover:bg-main active:scale-95'>
            Complete order
          </Link>
        </footer>
      </div>
    </>
  )
}

Shipping.getLayout = function getLayout(page: ReactElement) {
  return <CheckoutLayout>{page}</CheckoutLayout>
}

export default Shipping
