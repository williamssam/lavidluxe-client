import { InformationCircleIcon } from '@heroicons/react/20/solid'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CheckoutNav } from '../../components/CheckoutNav'
import { CheckoutLayout } from '../../layouts/CheckoutLayout'

type FormValues = {
  emailAddress: string
  firstName: string
  lastName: string
  phoneNumber: string
  address: string
  state: string
  city: string
  postalCode: number
  saveInfo?: boolean
}

const Information = () => {
  const router = useRouter()
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormValues>({})

  const submitForm: SubmitHandler<FormValues> = data => {
    console.log(data)
    router.push('/checkout/shipping')
  }
  return (
    <>
      <Head>
        <title>Checkout - Lavidluxe</title>
      </Head>

      <CheckoutNav />

      <form onSubmit={handleSubmit(submitForm)}>
        <div className='mt-10'>
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between text-xs'>
            <h3 className='uppercase tracking-[4px] text-xs font-bold text-gray-700'>
              Contact information
            </h3>
            <p>
              Already have an account? <span className='text-main'>Log in</span>
            </p>
          </div>

          <div className='pt-4 flex flex-col w-full'>
            <label htmlFor='email-address' className='capitalize text-sm'>
              Email Address
            </label>
            <input
              type='email'
              {...register('emailAddress', {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
              id='email-address'
              className={`px-3 py-3 ring-1 rounded text-sm focus:border-none focus:ring-2 focus:ring-main focus:outline-none mt-1 text-gray-700 w-full flex-1 ${
                errors.emailAddress ? 'ring-red-600 ring-2' : 'ring-gray-300'
              }`}
              placeholder='Enter email address'
            />
            {errors.emailAddress?.type === 'required' ? (
              <span className='text-xs p-1 text-red-600 flex items-center gap-2 pt-1'>
                <InformationCircleIcon className='w-4 h-4' />
                Email Address is required
              </span>
            ) : null}
            {errors.emailAddress?.type === 'pattern' ? (
              <span className='text-xs p-1 text-red-600 flex items-center gap-2 pt-1'>
                <InformationCircleIcon className='w-4 h-4' />
                Invalid email address
              </span>
            ) : null}
          </div>

          <div className='pt-4 flex flex-col w-full'>
            <label htmlFor='phoneNumber' className='capitalize text-sm'>
              Phone Number
            </label>
            <input
              type='tel'
              {...register('phoneNumber', {
                required: true,
              })}
              id='phoneNumber'
              className={`px-3 py-3 ring-1 rounded text-sm focus:border-none focus:ring-2 focus:ring-main focus:outline-none mt-1 text-gray-700 w-full flex-1 ${
                errors.phoneNumber ? 'ring-red-600 ring-2' : 'ring-gray-300'
              }`}
              placeholder='Enter email address'
            />
            {errors.phoneNumber ? (
              <span className='text-xs p-1 text-red-600 flex items-center gap-2 pt-1'>
                <InformationCircleIcon className='w-4 h-4' />
                Phone number is required
              </span>
            ) : null}
          </div>
        </div>

        <div className='mt-12'>
          <div className='flex items-center justify-between text-xs'>
            <h3 className='uppercase tracking-[4px] text-xs font-bold text-gray-700'>
              Shipping Information
            </h3>
          </div>

          <div className='flex flex-col md:gap-4 lg:flex-row items-start lg:items-center justify-between w-full'>
            <div className='pt-4 flex flex-col w-full'>
              <label htmlFor='first-name' className='capitalize text-sm'>
                First Name
              </label>
              <input
                type='text'
                {...register('firstName', {
                  required: true,
                })}
                id='first-name'
                className={`px-3 py-3 ring-1 rounded text-sm focus:border-none focus:ring-2 focus:ring-main focus:outline-none mt-1 text-gray-700 w-full flex-1 ${
                  errors.firstName ? 'ring-red-600 ring-2' : 'ring-gray-300'
                }`}
                placeholder='Enter email address'
              />
              {errors.firstName ? (
                <span className='text-xs p-1 text-red-600 flex items-center gap-2 pt-1'>
                  <InformationCircleIcon className='w-4 h-4' />
                  First name is required
                </span>
              ) : null}
            </div>
            <div className='pt-4 flex flex-col w-full'>
              <label htmlFor='last-name' className='capitalize text-sm'>
                Last Name
              </label>
              <input
                type='text'
                {...register('lastName', {
                  required: true,
                })}
                id='last-name'
                className={`px-3 py-3 ring-1 rounded text-sm focus:border-none focus:ring-2 focus:ring-main focus:outline-none mt-1 text-gray-700 w-full flex-1 ${
                  errors.lastName ? 'ring-red-600 ring-2' : 'ring-gray-300'
                }`}
                placeholder='Enter email address'
              />
              {errors.lastName ? (
                <span className='text-xs p-1 text-red-600 flex items-center gap-2 pt-1'>
                  <InformationCircleIcon className='w-4 h-4' />
                  Last name is required
                </span>
              ) : null}
            </div>
          </div>
          <div className='pt-4 flex flex-col w-full'>
            <label htmlFor='address' className='capitalize text-sm'>
              Address
            </label>
            <input
              type='text'
              {...register('address', {
                required: true,
              })}
              id='address'
              className={`px-3 py-3 ring-1 rounded text-sm focus:border-none focus:ring-2 focus:ring-main focus:outline-none mt-1 text-gray-700 w-full flex-1 ${
                errors.address ? 'ring-red-600 ring-2' : 'ring-gray-300'
              }`}
              placeholder='Enter email address'
            />
            {errors.address ? (
              <span className='text-xs p-1 text-red-600 flex items-center gap-2 pt-1'>
                <InformationCircleIcon className='w-4 h-4' />
                Shipping address is required
              </span>
            ) : null}
          </div>

          <div className='flex flex-col md:gap-4 lg:flex-row items-start lg:items-center justify-between w-full'>
            <div className='pt-4 flex flex-col w-full'>
              <label htmlFor='state' className='capitalize text-sm'>
                State
              </label>
              <input
                type='text'
                {...register('state', {
                  required: true,
                })}
                id='state'
                className={`px-3 py-3 ring-1 rounded text-sm focus:border-none focus:ring-2 focus:ring-main focus:outline-none mt-1 text-gray-700 w-full flex-1 ${
                  errors.state ? 'ring-red-600 ring-2' : 'ring-gray-300'
                }`}
                placeholder='Enter email address'
              />
              {errors.state ? (
                <span className='text-xs p-1 text-red-600 flex items-center gap-2 pt-1'>
                  <InformationCircleIcon className='w-4 h-4' />
                  State is required
                </span>
              ) : null}
            </div>
            <div className='pt-4 flex flex-col w-full'>
              <label htmlFor='city' className='capitalize text-sm'>
                City
              </label>
              <input
                type='text'
                {...register('city', {
                  required: true,
                })}
                id='city'
                className={`px-3 py-3 ring-1 rounded text-sm focus:border-none focus:ring-2 focus:ring-main focus:outline-none mt-1 text-gray-700 w-full flex-1 ${
                  errors.city ? 'ring-red-600 ring-2' : 'ring-gray-300'
                }`}
                placeholder='Enter email address'
              />
              {errors.city ? (
                <span className='text-xs p-1 text-red-600 flex items-center gap-2 pt-1'>
                  <InformationCircleIcon className='w-4 h-4' />
                  City is required
                </span>
              ) : null}
            </div>
            <div className='pt-4 flex flex-col w-full'>
              <label htmlFor='postal-code' className='capitalize text-sm'>
                Postal Code
              </label>
              <input
                type='tel'
                {...register('postalCode', {
                  required: true,
                  valueAsNumber: true,
                })}
                id='postal-code'
                className={`px-3 py-3 ring-1 rounded text-sm focus:border-none focus:ring-2 focus:ring-main focus:outline-none mt-1 text-gray-700 w-full flex-1 ${
                  errors.postalCode ? 'ring-red-600 ring-2' : 'ring-gray-300'
                }`}
                placeholder='Enter email address'
              />
              {errors.postalCode ? (
                <span className='text-xs p-1 text-red-600 flex items-center gap-2 pt-1'>
                  <InformationCircleIcon className='w-4 h-4' />
                  Postal code is required
                </span>
              ) : null}
            </div>
          </div>
          <label className='text-sm pt-5 flex items-center gap-2'>
            <input
              type='checkbox'
              className='accent-main'
              {...register('saveInfo')}
            />
            <span>Save this information for next time</span>
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
