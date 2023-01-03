import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { generateId } from 'utils/generateId'

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

  console.log('data', data)

  if (data.status === 'success') {
    return {
      redirect: {
        destination: 'http://localhost:3000/checkout/order-successful',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

const VerifyPayment = () => {
  console.log('generateId-verify-payment', generateId)

  return (
    <main className='min-h-screen transition-all flex flex-col items-center justify-center px-4 lg:px-10 xl:pl-40 xl:pr-20 py-10 lg:py-20'>
      {/* <div className='bg-gray-300 max-w-[50ch] text-center  py-4 px-10 rounded text-black'>
        <p className='text-sm '>
          Please wait while we verify your payment. You will be automatically
          redirected to our site. <br />{' '}
        </p>
        <p className='bg-main text-white py-1 leading-3 mt-3'>
          <strong className='uppercase text-xs tracking-[3px]'>
            Pls, Do not reload this page
          </strong>
        </p>
      </div> */}

      <div className='text-center text-sm bg-green-200 text-green-800 py-6 px-10 rounded max-w-[50ch]'>
        <p className='text-6xl'>🥳</p>
        <p className='uppercase tracking-[3px] font-vollkorn font-bold text-xl pt-3'>
          Payment successful
        </p>
        <p>Redirecting you back to our site.</p>

        <Link
          href='/checkout/order-successful'
          className='text-[0.65rem] mt-5 block hover:bg-main transition-all uppercase bg-[#333333] py-2 px-6 rounded active:scale-95 text-white tracking-[3px]'>
          Go back to site
        </Link>
      </div>

      <p className='text-xs max-w-[40ch] text-center pt-2'>
        If you have been debited and payment is no successful, kindly{' '}
        <Link href='/contact' className='text-main underline'>
          contact us
        </Link>{' '}
        or{' '}
        <a href='#' className='text-main underline'>
          retry
        </a>
      </p>
    </main>
  )
}
export default VerifyPayment
