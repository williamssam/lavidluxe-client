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
import ReactCanvasConfetti from 'react-canvas-confetti'
import { useCartStore } from 'store/cartStore'
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
  const { total } = useCart(cart)
  console.log('response', response)

  const cartItems = cart?.map(cart => {
    return {
      name: cart.name,
      quantity: cart.quantity,
      amount: cart.price,
      color: cart.color,
      size: cart.size,
      _key: nanoid(),
    }
  })

  const createOrderAndSendMail = async () => {
    const { payment_type, tx_ref, meta, customer } = response.data
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
    } catch (error) {
      console.log(error)
    }
  }

  useIsomorphicLayoutEffect(() => {
    createOrderAndSendMail()
    fire()
  }, [])

  return (
    <>
      <section className='w-full h-screen bg-main flex items-center justify-center'>
        <Head>
          <title>Thank you for your purchase - Lavidluxe</title>
        </Head>

        <section className='max-w-[70ch] bg-gray-100 shadow-xl p-6 rounded'>
          <header className='flex justify-center mb-5'>
            <Image src={logo} alt='lavidluxe logo' className='w-20' />
          </header>
          <div className='flex flex-col items-center justify-center gap-3'>
            <p className='text-8xl'>🎉</p>
            <div className='text-center'>
              <p className='uppercase text-xs tracking-[5px]'>
                Order #LL-{nanoid(4)}
              </p>
              <h2 className='text-3xl font-vollkorn font-bold text-green-600 uppercase tracking-[4px]'>
                Thank you!
              </h2>
            </div>
          </div>
          <div className='border border-gray-300 rounded-lg py-4 px-4 md:px-6 mt-10 flex flex-col gap-4 text-sm'>
            <h3 className='uppercase tracking-[3px] text-xs font-bold text-gray-700'>
              Your order is confirmed
            </h3>
            <p>
              You’ll receive a confirmation email with your order details
              shortly.
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
                {/* Payment successful - {formatCurrency(response.data.amount)} */}
                <span className='font-bold'>
                  {/* {formatCurrency(response.amount)} */}
                </span>
              </p>
            </div>

            <p>
              <strong>NB:</strong> Goods will be delivered to you within three
              (3) working days
            </p>
          </div>

          <footer className='flex flex-col items-center justify-between mt-10'>
            <Link
              href='/shop/all'
              onClick={() => clearCart()}
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

// OrderSuccessful.getLayout = function getLayout(page: ReactElement) {
//   return <CheckoutLayout>{page}</CheckoutLayout>
// }

export default OrderSuccessful
