import { useMutation } from '@apollo/client'
import Head from 'next/head'
import Link from 'next/link'
import { CREATE_ORDER } from 'utils/gql/mutations'

const OrderNotSuccesful = () => {
  const [createOrder, { data, loading, error }] = useMutation(CREATE_ORDER)

  /**

   $paymentMethod: String!
    $paymentMethodTitle: String!
    $address1: String!
    $city: String!
    $email: String!
    $state: String!
    $phone: String!
    $firstName: String!
    $lastName: String!
    $transationId: String!
    $productId: Int!
    $quantity: Int!
   */

  const orderVariables = {
    paymentMethod: 'card',
    paymentMethodTitle: 'flutterwave-card',
    address1: '123 Main St',
    city: 'Lekki',
    email: 'ghostdeveloper@yopmail.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '080000000',
    state: 'Lagos',
    transactionId: '5559aeares',
    lineItems: [
      {
        productId: 38,
        quantity: 2,
      },
      {
        productId: 36,
        quantity: 1,
      },
    ],
  }

  if (loading) return 'Submitting...'
  if (error) return `Submission error! ${error.message}`
  if (data) console.log('data', data)

  return (
    <section className='w-full h-screen bg-main flex items-center justify-center'>
      <Head>
        <title>Thank you for your purchase - Lavidluxe</title>
      </Head>

      <section className='max-w-[70ch] bg-gray-100 shadow-xl p-6 rounded'>
        <header className='flex flex-col items-center gap-5'>
          <p className='text-8xl'>😔</p>
          <div className='text-center mt-3'>
            {/* <p className='uppercase text-xs tracking-[5px]'>Order #1007</p> */}
            <h2 className='text-3xl font-bold text-red-600'>
              Payment not confirmed
            </h2>
          </div>
        </header>
        <div className='border border-gray-300 rounded-lg py-4 px-4 md:px-6 mt-10 flex flex-col gap-4 text-sm'>
          <h3 className='uppercase tracking-[3px] text-xs font-bold text-gray-700'>
            Your order is not confirmed yet
          </h3>
          <p>
            Unfortunately, we could not verify your payment. Please try again in
            a few minutes or contact us if you have been debited.
          </p>
        </div>

        <button
          className='bg-purple-200 mt-5 p-3'
          onClick={async () =>
            await createOrder({
              variables: orderVariables,
            })
          }>
          Create Order
        </button>

        <footer className='flex flex-col items-center justify-between mt-10'>
          <Link
            href='/shop/all'
            className='flex rounded justify-center bg-[#333333] text-white mt-3 md:mt-0 py-4 px-10 md:px-5 lg:px-10 text-xs font-bold uppercase w-full md:w-max tracking-[3px] lg:tracking-[4px] transition-all hover:border-main hover:bg-main active:scale-95'>
            Go back to shop
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
export default OrderNotSuccesful
