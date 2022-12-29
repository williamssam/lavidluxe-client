import Head from 'next/head'
import Link from 'next/link'
import { ReactElement } from 'react'
import { CheckoutLayout } from '../../layouts/CheckoutLayout'

const OrderSuccessful = () => {
  return (
    <>
      <Head>
        <title>Thank you for your purchase - Lavidluxe</title>
      </Head>

      <header className='flex items-start gap-5 mt-10'>
        <p className='text-4xl'>🎉</p>
        <div>
          <p className='uppercase text-[0.7rem] tracking-[3px]'>Order #1007</p>
          <h2 className='text-2xl font-bold'>Thank you! 🥳</h2>
        </div>
      </header>
      <div className='border border-gray-300 rounded-lg py-4 px-4 md:px-6 mt-10 flex flex-col gap-4 text-sm'>
        <h3 className='uppercase tracking-[3px] text-xs font-bold text-gray-700'>
          Your order is confirmed
        </h3>
        <p>
          You’ll receive a confirmation email with your order number shortly.
        </p>
      </div>
      <div className='text-xs border border-gray-300 rounded-lg py-4 px-4 md:px-6 mt-7 flex flex-col gap-4'>
        <h3 className='uppercase tracking-[3px] text-xs font-bold text-gray-700'>
          Customer information
        </h3>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-10 text-sm'>
          <div>
            <h4 className='uppercase tracking-[2px] text-[0.6rem] text-gray-700'>
              Contact information
            </h4>
            <p>williamsdamisamuel@outlook.com</p>
          </div>
          <div>
            <h4 className='uppercase tracking-[2px] text-[0.6rem] text-gray-700'>
              Payment method
            </h4>
            <p>Cash on Delivery (COD) - $500.60</p>
          </div>
          <div>
            <h4 className='uppercase tracking-[2px] text-[0.6rem] text-gray-700'>
              Shipping address
            </h4>
            <p>Lawal Bus Stop</p>
            <p>Ikotun LA</p>
            <p>Nigeria</p>
          </div>
          <div>
            <h4 className='uppercase tracking-[2px] text-[0.6rem] text-gray-700'>
              Shipping method
            </h4>
            <p>International Shipping</p>
          </div>
        </div>
      </div>

      <footer className='flex flex-col md:flex-row items-center justify-between mt-10'>
        <p className='text-xs'>
          Need help?{' '}
          <a href='mailto:#' className='text-main'>
            Contact us
          </a>
        </p>
        <Link
          href='/shop/all'
          className='flex rounded justify-center bg-[#333333] text-white mt-3 md:mt-0 py-4 px-10 md:px-5 lg:px-10 text-xs font-bold uppercase w-full md:w-max tracking-[3px] lg:tracking-[4px] transition-all hover:border-main hover:bg-main active:scale-95'>
          Continue shopping
        </Link>
      </footer>
    </>
  )
}

OrderSuccessful.getLayout = function getLayout(page: ReactElement) {
  return <CheckoutLayout>{page}</CheckoutLayout>
}

export default OrderSuccessful
