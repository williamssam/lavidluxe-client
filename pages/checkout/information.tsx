import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, ReactElement } from 'react'
import { TextInput } from '../../components/TextInput'
import { CheckoutLayout } from '../../layouts/CheckoutLayout'

const Information = () => {
  const router = useRouter()

  const submitForm = (e: FormEvent) => {
    e.preventDefault()
    router.push('/checkout/shipping')
  }
  return (
    <>
      <Head>
        <title>Checkout - Lavidluxe</title>
      </Head>

      <form onSubmit={submitForm}>
        <div className='mt-10'>
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between text-xs'>
            <h3 className='uppercase tracking-[4px] text-xs font-bold text-gray-700'>
              Contact information
            </h3>
            <p>
              Already have an account? <span className='text-main'>Log in</span>
            </p>
          </div>

          <TextInput
            label='Email address'
            type='email'
            id='email'
            placeholder='Enter your email address'
          />
        </div>

        <div className='mt-12'>
          <div className='flex items-center justify-between text-xs'>
            <h3 className='uppercase tracking-[4px] text-xs font-bold text-gray-700'>
              Shipping address
            </h3>
          </div>

          {/* <TextInput
            label='Country'
            type='text'
            id='country'
            placeholder='Enter your country'
          /> */}
          <TextInput
            label='full name'
            type='text'
            id='full-name'
            placeholder='Enter your full name (first name, last name)'
          />
          <TextInput
            label='Address'
            type='text'
            id='address'
            placeholder='Enter your address'
          />
          <TextInput
            label='Phone number'
            type='tel'
            id='phone-number'
            placeholder='Enter your phone number'
          />

          <div className='flex flex-col md:gap-4 lg:flex-row items-start lg:items-center justify-between w-full'>
            <TextInput
              label='City'
              type='text'
              id='city'
              placeholder='Enter your city'
            />
            <TextInput
              label='State'
              type='text'
              id='state'
              placeholder='Enter your state'
            />
            <TextInput
              label='Postal code'
              type='text'
              id='postal-code'
              placeholder='Enter your postal code'
            />
          </div>
          <label className='text-sm pt-5 flex items-center gap-2'>
            <input
              type='checkbox'
              name='accept'
              id='accept'
              className='accent-main'
            />
            Save this information for next time
            <span></span>
          </label>
        </div>

        <footer className='flex flex-col md:flex-row items-center justify-between mt-10'>
          {/* <Link
            href='/'
            className='text-sm flex items-center text-main transition-all py-1 px-2 rounded hover:bg-gray-50'>
            <ChevronLeftIcon className='w-7 h-7' />
            <span>Return home</span>
          </Link> */}
          <button
            type='submit'
            className='ml-auto flex rounded justify-center bg-[#333333] text-white mt-3 md:mt-0 py-4 px-10 md:px-5 lg:px-10 text-xs font-bold uppercase w-full md:w-max tracking-[3px] lg:tracking-[4px] transition-all hover:border-main hover:bg-main active:scale-95'>
            Continue to shipping
          </button>
        </footer>
      </form>
    </>
  )
}

Information.getLayout = function getLayout(page: ReactElement) {
  return <CheckoutLayout>{page}</CheckoutLayout>
}

export default Information
