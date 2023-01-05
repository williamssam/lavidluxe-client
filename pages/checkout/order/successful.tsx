import { useCart } from 'hooks/useCart'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { useCartStore } from 'store/cartStore'
import { formatCurrency } from 'utils/formatCurrency'

const OrderSuccessful = () => {
  const cart = useCartStore(state => state.cart)
  const clearCart = useCartStore(state => state.clearCart)
  const { total } = useCart(cart)

  useEffect(() => {
    clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className='w-full h-screen bg-main flex items-center justify-center'>
      <Head>
        <title>Thank you for your purchase - Lavidluxe</title>
      </Head>

      <section className='max-w-[70ch] bg-gray-100 shadow-xl p-6 rounded'>
        <header className='flex flex-col items-center gap-5'>
          <p className='text-8xl'>🎉</p>
          <div className='text-center mt-3'>
            <p className='uppercase text-xs tracking-[5px]'>Order #1007</p>
            <h2 className='text-3xl font-vollkorn font-bold text-green-600 uppercase tracking-[4px]'>
              Thank you!
            </h2>
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
            information
          </h3>

          <div>
            <h4 className='uppercase tracking-[2px] text-[0.6rem] text-gray-700'>
              Payment method
            </h4>
            <p>
              Payment with card -{' '}
              <span className='font-bold'>{formatCurrency(total)}</span>
            </p>
          </div>

          <p>
            <strong>NB:</strong> Goods will be delivered to you within three (3)
            working days
          </p>
        </div>

        <footer className='flex flex-col items-center justify-between mt-10'>
          <Link
            href='/shop/all'
            className='flex rounded justify-center bg-[#333333] text-white mt-3 md:mt-0 py-4 px-10 md:px-5 lg:px-10 text-xs font-bold uppercase w-full md:w-max tracking-[3px] lg:tracking-[4px] transition-all hover:border-main hover:bg-main active:scale-95'>
            Continue shopping
          </Link>
          <p className='text-xs mt-2'>
            Need help?{' '}
            <a href='mailto:#' className='text-main'>
              Contact us
            </a>
          </p>
        </footer>
      </section>
    </section>
  )
}

// OrderSuccessful.getLayout = function getLayout(page: ReactElement) {
//   return <CheckoutLayout>{page}</CheckoutLayout>
// }

export default OrderSuccessful
