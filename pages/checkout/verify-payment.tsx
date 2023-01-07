import { GetServerSideProps } from 'next'

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

  // console.log('data', data)

  // if (data.status === 'success') {
  //   return {
  //     redirect: {
  //       destination: '/checkout/order/successful',
  //       permanent: false,
  //     },
  //   }
  // }
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
      data: data,
    },
  }
}

// This page will not be visible to the user, I'm using this page to verify payment and if payment is verified they are redirected to the success page
const VerifyPayment = ({ data }) => {
  console.log('data', data)

  return (
    <main className='min-h-screen transition-all flex flex-col items-center justify-center px-4 lg:px-10 xl:pl-40 xl:pr-20 py-10 lg:py-20'>
      <p className='text-sm '>
        Please wait while we verify your payment. You will be automatically
        redirected to our site. <br />{' '}
      </p>
    </main>
  )
}
export default VerifyPayment
