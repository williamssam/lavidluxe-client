import {
  ChevronLeftIcon,
  InformationCircleIcon,
} from '@heroicons/react/20/solid'
import { CheckoutNav } from 'components/CheckoutNav'
import { Spinner } from 'components/Spinner'
import { useCart } from 'hooks/useCart'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { CheckoutLayout } from 'layouts/CheckoutLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { toast } from 'react-toastify'
import { useCartStore } from 'store/cartStore'
import { FormValues } from './information'

const Payment = () => {
  const router = useRouter()
  const [info, setInfo] = useState<FormValues | null>(null)
  const [loading, setLoading] = useState(false)
  const cart = useCartStore(state => state.cart)
  const { total } = useCart(cart)

  const initializePayment = async () => {
    setLoading(true)
    // remove user data from localstorage if save info is not checked
    if (!info?.saveInfo) {
      localStorage.removeItem('lavidluxeUser')
    }
    const response = await fetch('/api/initialize-payment', {
      method: 'POST',
      body: JSON.stringify({
        email: info?.emailAddress,
        amount: total,
        name: `${info?.firstName} ${info?.lastName}`,
        address: `${info?.address}, ${info?.city}, ${info?.state}`,
        phoneNumber: info?.phoneNumber,
        customerNote: info?.orderNote ?? '',
        deliveryMethod: info?.deliveryMethod,
      }),
      headers: {
        'content-type': 'application/json',
      },
    })
    const data = await response.json()
    if (!response.ok) {
      toast.error(data.message)
      return
    }
    window.location.href = data.data.authorization_url
  }

  useIsomorphicLayoutEffect(() => {
    if (cart.length === 0) {
      router.push('/checkout/information')
    }

    const userDetails = JSON.parse(
      localStorage.getItem('lavidluxeUser') as string
    )
    setInfo(userDetails)
  }, [])

  return (
    <>
      <NextSeo title='Checkout' nofollow noindex />

      <CheckoutNav />

      <div className='mt-10 flex flex-col gap-4 rounded-lg border border-gray-300 py-4 px-4 text-xs md:px-6'>
        <div className='flex items-center justify-between border-b pb-3'>
          <div className='flex flex-col items-start md:flex-row md:items-center md:gap-10'>
            <p className='md:w-10'>Contact</p>
            <p className='font-bold'>{info?.emailAddress}</p>
          </div>
          <button className='font-bold text-main' onClick={() => router.back()}>
            Change
          </button>
        </div>
        <div className='flex items-center justify-between border-b pb-3'>
          <div className='flex flex-col items-start md:flex-row md:items-center md:gap-10'>
            <p className='md:w-10'>Delivery Method</p>
            <p className='font-bold capitalize'>{info?.deliveryMethod}</p>
          </div>
          <button className='font-bold text-main' onClick={() => router.back()}>
            Change
          </button>
        </div>
        {info?.deliveryMethod === 'ship' ? (
          <div className='flex items-center justify-between border-b pb-3'>
            <div className='flex flex-col items-start md:flex-row md:items-center md:gap-10'>
              <p className='md:w-10'>Ship to</p>
              <p className='font-bold'>{`${info?.address}, ${info?.city}, ${info?.state}`}</p>
            </div>
            <button
              className='font-bold text-main'
              onClick={() => router.back()}>
              Change
            </button>
          </div>
        ) : null}

        <div className='flex items-center justify-between'>
          <div className='flex flex-col items-start md:flex-row md:gap-10'>
            <p className='w-10'>Note</p>
            <p className='font-bold'>
              {info?.deliveryMethod === 'pick up'
                ? 'Your order must be picked up from our store at No 11, Isashi Road, Ojo, Lagos.'
                : 'Your delivery will take three to seven working days depending on your location.'}
            </p>
          </div>
        </div>
      </div>

      <footer className='mt-14 flex flex-col items-center justify-between md:flex-row'>
        <button
          type='button'
          onClick={() => router.back()}
          className='flex items-center rounded py-1 px-2 text-sm text-main transition-all hover:bg-gray-50'>
          <ChevronLeftIcon className='h-7 w-7' />
          <span>Return to information</span>
        </button>

        <button
          type='button'
          onClick={initializePayment}
          disabled={loading || cart.length <= 0}
          className='mt-3 flex w-full items-center justify-center rounded bg-[#333333] py-4 px-10 text-xs font-bold uppercase tracking-[3px] text-white transition-all hover:border-main hover:bg-main active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#333333] disabled:opacity-30 md:mt-0 md:w-max md:px-5 lg:px-10 lg:tracking-[4px]'>
          <span>Pay for order</span>
          {loading ? <Spinner /> : null}
        </button>
      </footer>

      <p className='mx-auto mt-8 flex max-w-[60ch] flex-col items-center gap-1 rounded bg-gray-200 py-2 px-6 text-center text-xs font-medium'>
        <InformationCircleIcon className='h-5 w-5 text-gray-800' />
        <span>
          NOTE: Please crosscheck your cart before paying as we won&apos;t be
          able to change anything or refund your money. Thank you.
        </span>
      </p>
    </>
  )
}

Payment.getLayout = function getLayout(page: ReactElement) {
  return <CheckoutLayout>{page}</CheckoutLayout>
}

export default Payment
