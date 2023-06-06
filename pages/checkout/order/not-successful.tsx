import { NextSeo } from 'next-seo'
import Link from 'next/link'

const OrderNotSuccesful = () => {
  return (
    <>
      <NextSeo title='Order Not Successful' nofollow noindex />

      <section className='flex h-screen w-full items-center justify-center bg-red-200'>
        <div className='max-w-[70ch] rounded bg-gray-100 p-6 shadow-xl'>
          <header className='flex flex-col items-center gap-5'>
            <p className='text-8xl'>😔</p>
            <div className='mt-3 text-center'>
              <h2 className='text-3xl font-bold text-red-600'>
                Payment could not be confirmed
              </h2>
            </div>
          </header>
          <div className='mt-10 flex flex-col gap-4 rounded-lg border border-gray-300 py-4 px-4 text-sm md:px-6'>
            <h3 className='text-xs font-bold uppercase tracking-[3px] text-gray-700'>
              Your order was not confirmed!
            </h3>
            <p>
              Unfortunately, we could not verify your payment. Please try again
              in a few minutes or{' '}
              <a
                href='https://api.whatsapp.com/send?phone=2348162234838'
                className='text-main underline'>
                contact us on whatsapp
              </a>{' '}
              if you have been debited.
            </p>
          </div>

          <footer className='mt-10 flex flex-col items-center justify-between'>
            <Link
              href='/shop/women-wears'
              className='mt-3 flex w-full justify-center rounded bg-[#333333] py-4 px-10 text-xs font-bold uppercase tracking-[3px] text-white transition-all hover:border-main hover:bg-main active:scale-[0.98] md:mt-0 md:w-max md:px-5 lg:px-10 lg:tracking-[4px]'>
              Go back to shop
            </Link>
            <p className='mt-2 text-xs'>
              Need help?{' '}
              <a href='mailto:lavidluxe@gmail.com' className='text-main'>
                Contact us
              </a>
            </p>
          </footer>
        </div>
      </section>
    </>
  )
}
export default OrderNotSuccesful
