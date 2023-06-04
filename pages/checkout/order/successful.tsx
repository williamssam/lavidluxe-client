import logo from 'assets/images/logo.png'
import { useCart } from 'hooks/useCart'
import { useConfetti } from 'hooks/useConfetti'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { PaystackResponse } from 'models/paystackModel'
import { nanoid } from 'nanoid'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ReactCanvasConfetti from 'react-canvas-confetti'
import { toast } from 'react-toastify'
import { useCartStore } from 'store/cartStore'
import { formatCurrency } from 'utils/functions/formatCurrency'
import { client } from 'utils/sanity/client'

export const getServerSideProps: GetServerSideProps<{
  response: PaystackResponse
}> = async context => {
  const { query } = context
  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${query.reference}`,
    {
      headers: {
        Authorization: `Bearer ${
          process.env.NODE_ENV === 'production'
            ? process.env.PAYSTACK_LIVE_SECRET_KEY
            : process.env.PAYSTACK_TEST_SECRET_KEY
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
  const router = useRouter()
  const cart = useCartStore(state => state.cart)
  const clearCart = useCartStore(state => state.clearCart)
  const { fire, getInstance } = useConfetti()
  const { total, subtotal } = useCart(cart)

  const cartItems = cart?.map(cart => ({
    name: cart.name,
    quantity: cart.quantity,
    amount: cart.price,
    color: cart.color,
    size: cart.size,
    _key: nanoid(),
  }))

  const sendMail = async () => {
    const data = await fetch('/api/send-mail', {
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        recipient: response.data.customer.email,
        address: response.data.metadata.address,
        phone_number: response.data.metadata.phoneNumber,
        name: response.data.metadata.name,
        subtotal: formatCurrency(subtotal),
        total: formatCurrency(total),
        year: new Date().getFullYear(),
        order_id: response.data.metadata.orderID,
        items: cart?.map(cart => ({
          product_name: cart.name,
          quantity: cart.quantity,
          price: cart.price,
          color: cart.color ?? '',
          size: cart.size,
        })),
      }),
    })

    if (data.ok) {
      toast.success('Order mail sent successfully!')
    }
  }

  const createOrder = async () => {
    try {
      const order = {
        _type: 'order',
        orderId: response.data.metadata.orderID,
        orderBy: response.data.metadata.name,
        transactionId: response.data.reference,
        paymentMethod: response.data.channel,
        paidAt: new Date(response.data.paid_at).toLocaleString('default', {
          hour12: true,
        }),
        amount: total,
        orderItems: cartItems,
        shippingInformation: {
          name: response.data.metadata.name,
          email: response.data.customer.email,
          address: response.data.metadata.address,
          phoneNumber: response.data.metadata.phoneNumber,
        },
        customerNote: response.data.metadata.customerNote,
      }
      await client.create(order)
      await sendMail()
      return
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
      }
    }
  }

  useIsomorphicLayoutEffect(() => {
    if (cart.length === 0) {
      router.push('/shop/women-wears')
      return
    }
    fire()
    createOrder()
  }, [])

  return (
    <>
      <NextSeo title='Order Successful' nofollow noindex />

      <section className='flex h-screen w-full items-center justify-center bg-main'>
        <div className='h-[96%] max-w-[70ch] overflow-auto rounded bg-gray-100 p-6 shadow-xl'>
          <header className='mb-5 flex justify-center'>
            <Image src={logo} alt='lavidluxe logo' className='w-20' />
          </header>
          <div className='flex flex-col items-center justify-center gap-3'>
            <p className='text-8xl'>🎉</p>
            <div className='text-center'>
              <p className='text-xs'>
                Order No:{' '}
                <span className='font-bold'>
                  {response.data.metadata.orderID}
                </span>
              </p>
              <h2 className='font-vollkorn text-3xl font-bold text-dark'>
                Thank you, {response.data.metadata.name.split(' ')[0]}
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
                Payment
              </h4>
              <p>
                Payment successful -
                <span className='font-bold'>
                  {formatCurrency(response.data.amount / 100)}
                </span>
              </p>
              <p>
                Transaction reference:{' '}
                <span className='font-bold'>{response.data.reference}</span>
              </p>
            </div>

            <div>
              <h4 className='text-[0.6rem] uppercase tracking-[2px] text-gray-700'>
                Contact Information
              </h4>
              <p>{response.data.customer.email}</p>
            </div>

            <p>
              <strong>NB:</strong> Goods will be delivered to you within three
              to seven working days
            </p>
          </div>

          <footer className='mt-10 flex flex-col items-center justify-between'>
            <Link
              href='/shop/women-wears'
              onClick={() => clearCart()}
              className='mt-3 flex w-full justify-center rounded bg-[#333333] py-4 px-16 text-xs font-bold uppercase tracking-[3px] text-white transition-all hover:border-main hover:bg-main active:scale-[0.98] md:mt-0 md:w-max md:px-5 lg:px-10 lg:tracking-[4px]'>
              Continue shopping
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
