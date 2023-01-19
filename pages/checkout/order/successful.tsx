import logo from 'assets/images/logo.png'
import { useCart } from 'hooks/useCart'
import { useConfetti } from 'hooks/useConfetti'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { FluttwerwaveResponse } from 'models/fluttwerwaveModel'
import { nanoid } from 'nanoid'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import ReactCanvasConfetti from 'react-canvas-confetti'
import { useCartStore } from 'store/cartStore'
import { formatCurrency } from 'utils/functions/formatCurrency'
import { client } from 'utils/sanity/client'

export const getServerSideProps: GetServerSideProps<{
  response: FluttwerwaveResponse
}> = async context => {
  const { query } = context
  const trasactionid = query.transaction_id
  const res = await fetch(
    `https://api.flutterwave.com/v3/transactions/${trasactionid}/verify`,
    {
      headers: {
        Authorization: `Bearer ${
          process.env.NODE_ENV === 'development'
            ? process.env.FLW_DEV_SECRET_KEY
            : process.env.FLW_PROD_SECRET_KEY
        }`,
      },
    }
  )
  const data = await res.json()

  if (data.status === 'error') {
    return {
      redirect: {
        destination: '/checkout/order/not-successful',
        permanent: false,
      },
    }
  }

  return {
    props: {
      response: data,
    },
  }
}

const OrderSuccessful = ({
  response,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const cart = useCartStore(state => state.cart)
  const clearCart = useCartStore(state => state.clearCart)
  const { fire, getInstance } = useConfetti()
  const { total, subtotal } = useCart(cart)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  // console.log('response', response)

  const cartItems = cart?.map(cart => ({
    name: cart.name,
    quantity: cart.quantity,
    amount: cart.price,
    color: cart.color,
    size: cart.size,
    _key: nanoid(),
  }))
  let orderId = nanoid(5)
  const { payment_type, tx_ref, meta, customer } = response.data

  const createOrder = async () => {
    try {
      const order = {
        _type: 'order',
        orderBy: `${meta.firstName} ${meta.lastName}`,
        transactionId: tx_ref,
        paymentMethod: payment_type,
        totalAmount: total,
        status: 'processing',
        orderItems: cartItems,
        shippingInformation: {
          name: `${meta.firstName} ${meta.lastName}`,
          email: customer.email,
          address: `${meta.address}, ${meta.city}, ${meta.state}`,
          phoneNumber: customer.phone_number,
        },
        customerNote: meta.customerNote,
      }
      await client.create(order)
      return
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
      }
    }
  }

  // const sendMail = () => {
  //   fetch('/api/send-mail', {
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     method: 'POST',
  //     body: JSON.stringify({
  //       email: customer.email,
  //       address: `${meta.address}, ${meta.city}, ${meta.state}`,
  //       phoneNumber: customer.phone_number,
  //       name: `${meta.firstName} ${meta.lastName}`,
  //       subtotal: formatCurrency(subtotal),
  //       total: formatCurrency(total),
  //       year: new Date().getFullYear(),
  //       order_id: `#LALU-${orderId}`,
  //       items: cart?.map(cart => ({
  //         product_name: cart.name,
  //         quantity: cart.quantity,
  //         price: cart.price,
  //         color: cart.color,
  //         size: cart.size,
  //       })),
  //     }),
  //   }).then(res => console.log(res))
  // }

  useIsomorphicLayoutEffect(() => {
    fire()
    createOrder()
    // sendMail()
  }, [])

  return (
    <>
      <section className='flex h-screen w-full items-center justify-center bg-main'>
        <Head>
          <title>Thank you for your purchase - Lavidluxe</title>
        </Head>

        <section className='max-w-[70ch] rounded bg-gray-100 p-6 shadow-xl'>
          <header className='mb-5 flex justify-center'>
            <Image src={logo} alt='lavidluxe logo' className='w-20' />
          </header>
          <div className='flex flex-col items-center justify-center gap-3'>
            <p className='text-8xl'>🎉</p>
            <div className='text-center'>
              <p className='text-xs uppercase tracking-[5px]'>
                Order #LALU-{orderId}
              </p>
              <h2 className='font-vollkorn text-3xl font-bold uppercase tracking-[4px] text-green-600'>
                Thank you!
              </h2>
            </div>
          </div>
          <div className='mt-10 flex flex-col gap-4 rounded-lg border border-gray-300 py-4 px-4 text-sm md:px-6'>
            <h3 className='text-xs font-bold uppercase tracking-[3px] text-gray-700'>
              Your order is confirmed
            </h3>
            <p>
              You’ll receive a confirmation email with your order details
              shortly.
            </p>
          </div>
          <div className='mt-7 flex flex-col gap-4 rounded-lg border border-gray-300 py-4 px-4 text-xs md:px-6'>
            <h3 className='text-xs font-bold uppercase tracking-[3px] text-gray-700'>
              information
            </h3>

            <div>
              <h4 className='text-[0.6rem] uppercase tracking-[2px] text-gray-700'>
                Payment method
              </h4>
              <p>
                Payment successful -
                <span className='font-bold'>
                  {formatCurrency(response.data.amount)}
                </span>
              </p>
            </div>

            <p>
              <strong>NB:</strong> Goods will be delivered to you within three
              (3) working days
            </p>
          </div>

          <footer className='mt-10 flex flex-col items-center justify-between'>
            <Link
              href='/shop/all'
              onClick={() => clearCart()}
              className='mt-3 flex w-full justify-center rounded bg-[#333333] py-4 px-10 text-xs font-bold uppercase tracking-[3px] text-white transition-all hover:border-main hover:bg-main active:scale-95 md:mt-0 md:w-max md:px-5 lg:px-10 lg:tracking-[4px]'>
              Continue shopping
            </Link>
            <p className='mt-2 text-xs'>
              Need help?{' '}
              <a href='mailto:#' className='text-main'>
                Contact us
              </a>
            </p>
          </footer>
        </section>
      </section>

      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
      />
    </>
  )
}

export default OrderSuccessful
