import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { CheckoutNav } from 'components/CheckoutNav'
import { Spinner } from 'components/Spinner'
import { useCart } from 'hooks/useCart'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { CheckoutLayout } from 'layouts/CheckoutLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { toast } from 'react-toastify'
import { useCartStore } from 'store/cartStore'
import { FormValues } from './information'

type UserInfo = Omit<FormValues, 'saveInfo'>

const Payment = () => {
  const router = useRouter()
  const [info, setInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const cart = useCartStore(state => state.cart)
  const { total } = useCart(cart)

  const initializePayment = async () => {
    setLoading(true)
    const response = await fetch('/api/initialize-payment', {
      method: 'POST',
      body: JSON.stringify({
        email: info?.emailAddress,
        amount: total,
        name: `${info?.firstName} ${info?.lastName}`,
        address: `${info?.address}, ${info?.city}, ${info?.state}`,
        phoneNumber: info?.phoneNumber,
        customerNote: info?.orderNote ?? '',
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
    // setLoading(false)
  }

  useIsomorphicLayoutEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userInfo') as string)
    if (!userDetails) {
      router.push('/checkout/information')
    }
    setInfo(userDetails)
  }, [])

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
            <p className='font-bold'>{info?.emailAddress}</p>
          </div>
          <button className='font-bold text-main' onClick={() => router.back()}>
            Change
          </button>
        </div>
        <div className='flex items-center justify-between border-b pb-3'>
          <div className='flex flex-col items-start md:flex-row md:items-center md:gap-10'>
            <p className='w-10'>Ship to</p>
            <p className='font-bold'>{`${info?.address}, ${info?.city}, ${info?.state}`}</p>
          </div>
          <button className='font-bold text-main' onClick={() => router.back()}>
            Change
          </button>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col items-start md:flex-row md:gap-10'>
            <p className='w-12'>Note</p>
            <p className='font-bold'>
              We deliver nationwide and some parts of the world.
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
    </>
  )
}

Payment.getLayout = function getLayout(page: ReactElement) {
  return <CheckoutLayout>{page}</CheckoutLayout>
}

export default Payment
