import logo from 'assets/images/logo.png'
import { FlutterWaveResponse } from 'flutterwave-react-v3/dist/types'
import { useCart } from 'hooks/useCart'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useLayoutEffect } from 'react'
import { useCartStore } from 'store/cartStore'
import { client } from 'utils/apollo/ApolloWrapper'
import { formatCurrency } from 'utils/functions/formatCurrency'
import { CREATE_ORDER } from 'utils/gql/mutations'

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context
  const trasactionid = query.transaction_id
  const res = await fetch(
    `https://api.flutterwave.com/v3/transactions/${trasactionid}/verify`,
    {
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
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

type OrderSuccessfulProps = {
  response: FlutterWaveResponse
}

const OrderSuccessful = ({ response }: any) => {
  const cart = useCartStore(state => state.cart)
  const clearCart = useCartStore(state => state.clearCart)
  const { vat } = useCart(cart)

  console.log('response', response)

  useLayoutEffect(() => {
    const { payment_type, tx_ref, meta, customer } = response.data
    async function createUserOrder() {
      const orderVariables = {
        paymentMethod: payment_type,
        paymentMethodTitle: `flutterwave ${payment_type}`,
        transactionId: tx_ref,
        address1: meta.address,
        state: meta.state,
        city: meta.city,
        email: customer.email,
        firstName: meta.firstName,
        lastName: meta.lastName,
        phone: customer.phone_number,
        customerNote: meta.customerNote,
        lineItems: cart.map(cartItem => {
          return {
            productId: cartItem.databaseId,
            quantity: cartItem.quantity,
            name: cartItem.name,
            metaData: [
              {
                key: 'color',
                value: cartItem.color === 'Select' ? 'normal' : cartItem.color,
              },
            ],
          }
        }),
        feeLines: [
          {
            name: 'VAT (Value added tax)',
            total: String(vat),
          },
        ],
      }

      // console.log('orderVariables', orderVariables)

      await client.mutate({
        mutation: CREATE_ORDER,
        variables: orderVariables,
      })
    }
    createUserOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
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
            {/* <p className='uppercase text-xs tracking-[5px]'>Order #1007</p> */}
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
            You’ll receive a confirmation email with your order details shortly.
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
              Payment successful - {formatCurrency(response.data.amount)}
              <span className='font-bold'>
                {/* {formatCurrency(response.amount)} */}
              </span>
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
  )
}

// OrderSuccessful.getLayout = function getLayout(page: ReactElement) {
//   return <CheckoutLayout>{page}</CheckoutLayout>
// }

export default OrderSuccessful
