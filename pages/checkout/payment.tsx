import { CheckIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'
import { CheckoutNav } from 'components/CheckoutNav'
import { Spinner } from 'components/Spinner'
import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3'
import { useCart } from 'hooks/useCart'
import { useAtom } from 'jotai'
import { CheckoutLayout } from 'layouts/CheckoutLayout'
import { nanoid } from 'nanoid'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, ReactElement, useEffect, useState } from 'react'
import { useCartStore } from 'store/cartStore'
import { userInfo } from 'store/gloablAtom'
import { formatCurrency } from 'utils/formatCurrency'

const Payment = () => {
  const router = useRouter()
  const [info, setInfo] = useAtom(userInfo)
  const [checkedValue, setCheckedValue] = useState('payment-with-card')
  const [loading, setLoading] = useState(false)
  const cart = useCartStore(state => state.cart)
  const { total } = useCart(cart)

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setCheckedValue(event.currentTarget.value)
  }

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY!,
    tx_ref: nanoid(),
    amount: total,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd,banktransfer',
    redirect_url: 'http://localhost:3000/checkout/verify-payment',
    customer: {
      email: info.email,
      phone_number: info.phone_number,
      name: info.name,
    },
    customizations: {
      title: 'Lavidluxe Store',
      description: 'Payment for items in cart',
      logo: 'https://lavidluxe.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.886d38a9.png&w=750&q=75',
    },
  }

  const handleFlutterPayment = useFlutterwave(config)

  useEffect(() => {
    if (!info.email && !info.phone_number && !info.name) {
      router.push('/checkout/information')
    }
  }, [info.email, info.name, info.phone_number, router])

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
            <p className='font-bold'>{info.email}</p>
          </div>
          <button className='text-main font-bold' onClick={() => router.back()}>
            Change
          </button>
        </div>
        <div className='flex items-center justify-between border-b pb-3'>
          <div className='flex flex-col md:flex-row items-start md:items-center md:gap-10'>
            <p>Ship to</p>
            <p className='font-bold'>{info.address}</p>
          </div>
          <button className='text-main font-bold' onClick={() => router.back()}>
            Change
          </button>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col md:flex-row items-start md:items-center md:gap-10'>
            <p>Method</p>
            <p className='font-bold'>
              Shipping outside Lagos cost {formatCurrency(2500)}
            </p>
          </div>
        </div>
      </div>

      <div className='mt-14'>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between text-xs'>
          <h3 className='uppercase tracking-[4px] text-xs font-bold text-gray-700'>
            Payment method
          </h3>
          <p>All transactions are secure and encrypted</p>
        </div>

        <ul className='pt-5 text-sm'>
          {/* <li className='flex items-center gap-2'>
            <input
              type='radio'
              name='payment-type'
              id='payment-on-delivery'
              className='hidden peer'
              value='payment-on-delivery'
              onChange={handleChange}
              checked={checkedValue === 'payment-on-delivery'}
            />
            <span className='bg-main w-6 h-6 rounded items-center justify-center hidden peer-checked:flex translate-x-3 peer-checked:translate-x-0 transition-transform'>
              <CheckIcon className='w-4 h-4 text-gray-100' />
            </span>
            <label
              htmlFor='payment-on-delivery'
              className='py-2 px-5 rounded bg-[#8c8c8c] relative left-0 peer-checked:left-2 flex items-center gap-4 w-52 text-white peer-checked:bg-main cursor-pointer transition-all ring-2 ring-gray-300 peer-checked:ring-main/50'>
              <div>
                <span className='font-bold'>Payment on delivery</span>
                <p className='text-[0.6rem] leading-3 text-gray-200'>(POD)</p>
              </div>
            </label>
          </li> */}
          <li className='flex items-center gap-2 mt-4'>
            <input
              type='radio'
              name='payment-type'
              id='payment-with-card'
              className='hidden peer'
              value='payment-with-card'
              onChange={handleChange}
              checked={checkedValue === 'payment-with-card'}
            />
            <span className='bg-main w-6 h-6 rounded items-center justify-center hidden peer-checked:flex'>
              <CheckIcon className='w-4 h-4 text-gray-100' />
            </span>
            <label
              htmlFor='payment-with-card'
              className='py-2 px-5 rounded bg-[#8c8c8c] relative left-0 peer-checked:left-2 flex items-center gap-4 w-52 text-white peer-checked:bg-main cursor-pointer transition-all ring-2 ring-gray-300 peer-checked:ring-main/50'>
              <div>
                <p className='font-bold'>Payment with card</p>
                <p className='text-[0.6rem] leading-3 text-gray-200'>
                  powered by flutterwave
                </p>
              </div>
            </label>
          </li>
          {/* {checkedError ? (
            <li className='text-xs p-1 text-red-600 flex items-center gap-2 pt-1'>
              <InformationCircleIcon className='w-4 h-4' />
              <span>Please select a payment method</span>
            </li>
          ) : null} */}
        </ul>

        <footer className='flex flex-col md:flex-row items-center justify-between mt-10'>
          <button
            type='button'
            onClick={() => router.back()}
            className='text-sm flex items-center text-main transition-all py-1 px-2 rounded hover:bg-gray-50'>
            <ChevronLeftIcon className='w-7 h-7' />
            <span>Return to information</span>
          </button>

          {checkedValue === 'payment-on-delivery' ? (
            <Link
              href='/checkout/order-successful'
              className='flex rounded justify-center bg-[#333333]  text-white mt-3 md:mt-0 py-4 px-10 md:px-5 lg:px-10 text-xs font-bold uppercase w-full md:w-max tracking-[3px] lg:tracking-[4px] transition-all hover:border-main hover:bg-main active:scale-95'>
              Complete order
            </Link>
          ) : (
            <button
              type='button'
              onClick={() => {
                setLoading(true)
                setInfo({ ...info, payment_method: checkedValue })
                handleFlutterPayment({
                  callback: response => {
                    setLoading(false)
                    console.log('response', response)
                    closePaymentModal()
                  },
                  onClose: () => {
                    setLoading(false)
                  },
                })
              }}
              disabled={loading}
              className='flex items-center rounded justify-center bg-[#333333] text-white mt-3 md:mt-0 py-4 px-10 md:px-5 lg:px-10 text-xs font-bold uppercase w-full md:w-max tracking-[3px] lg:tracking-[4px] transition-all hover:border-main hover:bg-main active:scale-95 disabled:cursor-none disabled:opacity-30'>
              <span>Pay for order</span>
              {loading ? <Spinner /> : null}
            </button>
          )}
        </footer>
      </div>
    </>
  )
}

Payment.getLayout = function getLayout(page: ReactElement) {
  return <CheckoutLayout>{page}</CheckoutLayout>
}

export default Payment
