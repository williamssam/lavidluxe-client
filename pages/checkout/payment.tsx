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
import { userInfo } from 'store/atoms'
import { useCartStore } from 'store/cartStore'
import { formatCurrency } from 'utils/functions/formatCurrency'

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
    public_key:
      process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_FLW_DEV_PUBLIC_KEY!
        : process.env.NEXT_PUBLIC_FLW_PROD_PUBLIC_KEY!,
    tx_ref: nanoid(),
    amount: total,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd,banktransfer',
    redirect_url: '/checkout/order/successful',
    customer: {
      email: info.email,
      phone_number: info.phone_number,
      name: `${info.firstName} ${info.lastName}`,
    },
    meta: {
      firstName: info.firstName,
      lastName: info.lastName,
      address: info.address,
      city: info.city,
      state: info.state,
      orderNote: info.order_note,
    },
    customizations: {
      title: 'Lavidluxe Store',
      description: 'Payment for items in cart',
      logo: 'https://lavidluxe.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.886d38a9.png&w=750&q=75',
    },
  }

  const handleFlutterPayment = useFlutterwave(config)

  useEffect(() => {
    if (
      !info.email &&
      !info.phone_number &&
      !info.firstName &&
      !info.lastName
    ) {
      router.push('/checkout/information')
    }
  }, [info.email, info.firstName, info.lastName, info.phone_number, router])

  return (
    <>
      <Head>
        <title>Checkout - Lavidluxe</title>
      </Head>

      <CheckoutNav />

      <div className='mt-10 flex flex-col gap-4 rounded-lg border border-gray-300 py-4 px-4 text-xs md:px-6'>
        <div className='flex items-center justify-between border-b pb-3'>
          <div className='flex flex-col items-start md:flex-row md:items-center md:gap-10'>
            <p className='w-10'>Contact</p>
            <p className='font-bold'>{info.email}</p>
          </div>
          <button className='font-bold text-main' onClick={() => router.back()}>
            Change
          </button>
        </div>
        <div className='flex items-center justify-between border-b pb-3'>
          <div className='flex flex-col items-start md:flex-row md:items-center md:gap-10'>
            <p className='w-10'>Ship to</p>
            <p className='font-bold'>{`${info.address}, ${info.city}, ${info.state}`}</p>
          </div>
          <button className='font-bold text-main' onClick={() => router.back()}>
            Change
          </button>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col items-start md:flex-row md:gap-10'>
            <p className='w-12'>Note</p>
            <p className='font-bold'>
              We only deliver within Lagos, Nigeria. You must pay an extra
              {formatCurrency(2500)} if you want us to ship to a location
              outside of Lagos.
            </p>
          </div>
        </div>
      </div>

      <div className='mt-14'>
        <div className='flex flex-col items-start justify-between text-xs md:flex-row md:items-center'>
          <h3 className='text-xs font-bold uppercase tracking-[4px] text-gray-700'>
            Payment method
          </h3>
          <p>All transactions are secure and encrypted</p>
        </div>

        <ul className='pt-5 text-sm'>
          <li className='mt-4 flex items-center gap-2'>
            <input
              type='radio'
              name='payment-type'
              id='payment-with-card'
              className='peer hidden'
              value='payment-with-card'
              onChange={handleChange}
              checked={checkedValue === 'payment-with-card'}
            />
            <span className='hidden h-6 w-6 items-center justify-center rounded bg-main peer-checked:flex'>
              <CheckIcon className='h-4 w-4 text-gray-100' />
            </span>
            <label
              htmlFor='payment-with-card'
              className='relative left-0 flex w-52 cursor-pointer items-center gap-4 rounded bg-[#8c8c8c] py-2 px-5 text-white ring-2 ring-gray-300 transition-all peer-checked:left-2 peer-checked:bg-main peer-checked:ring-main/50'>
              <div>
                <p className='font-bold'>Payment with card</p>
                <p className='text-[0.6rem] leading-3 text-gray-200'>
                  powered by flutterwave
                </p>
              </div>
            </label>
          </li>
        </ul>

        <footer className='mt-10 flex flex-col items-center justify-between md:flex-row'>
          <button
            type='button'
            onClick={() => router.back()}
            className='flex items-center rounded py-1 px-2 text-sm text-main transition-all hover:bg-gray-50'>
            <ChevronLeftIcon className='h-7 w-7' />
            <span>Return to information</span>
          </button>

          {checkedValue === 'payment-on-delivery' ? (
            <Link
              href='/checkout/order-successful'
              className='mt-3 flex w-full justify-center  rounded bg-[#333333] py-4 px-10 text-xs font-bold uppercase tracking-[3px] text-white transition-all hover:border-main hover:bg-main active:scale-95 md:mt-0 md:w-max md:px-5 lg:px-10 lg:tracking-[4px]'>
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
                    closePaymentModal()
                  },
                  onClose: () => {
                    setLoading(false)
                  },
                })
              }}
              disabled={loading || cart.length <= 0}
              className='mt-3 flex w-full items-center justify-center rounded bg-[#333333] py-4 px-10 text-xs font-bold uppercase tracking-[3px] text-white transition-all hover:border-main hover:bg-main active:scale-95 disabled:cursor-not-allowed disabled:bg-[#333333] disabled:opacity-30 md:mt-0 md:w-max md:px-5 lg:px-10 lg:tracking-[4px]'>
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
