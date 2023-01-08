import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { CheckoutNav } from 'components/CheckoutNav'
import { useAtom } from 'jotai'
import { CheckoutLayout } from 'layouts/CheckoutLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { userInfo } from 'store/atoms'

type FormValues = {
  emailAddress: string
  firstName: string
  lastName: string
  phoneNumber: string
  address: string
  state: string
  city: string
  // postalCode: number
  saveInfo?: boolean
  orderNote?: string
}

const Information = () => {
  const router = useRouter()
  const [_, setInfo] = useAtom(userInfo)
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<FormValues>({})

  const submitForm: SubmitHandler<FormValues> = data => {
    setInfo({
      email: data.emailAddress,
      firstName: data.firstName,
      lastName: data.lastName,
      phone_number: data.phoneNumber,
      address: data.address,
      state: data.state,
      city: data.city,
      order_note: data.orderNote,
    })
    if (data.saveInfo) {
      localStorage.setItem('userInfo', JSON.stringify(data))
    }
    router.push('/checkout/payment')
  }

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userInfo')!)
    if (!userDetails) return
    setValue('address', userDetails.address)
    setValue('state', userDetails.state)
    setValue('city', userDetails.city)
    setValue('firstName', userDetails.firstName)
    setValue('lastName', userDetails.lastName)
    setValue('phoneNumber', userDetails.phoneNumber)
    setValue('emailAddress', userDetails.emailAddress)
  }, [setValue])
  return (
    <>
      <Head>
        <title>Checkout - Lavidluxe</title>
      </Head>

      <CheckoutNav />

      <form onSubmit={handleSubmit(submitForm)}>
        <div className='mt-10'>
          <h3 className='uppercase tracking-[4px] text-xs font-bold text-gray-700'>
            Contact information
          </h3>

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
              />
              {errors.city ? (
                <span className='text-xs p-1 text-red-600 flex items-center gap-2 pt-1'>
                  <InformationCircleIcon className='w-4 h-4' />
                  City is required
                </span>
              ) : null}
            </div>
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
              />
              {errors.state ? (
                <span className='text-xs p-1 text-red-600 flex items-center gap-2 pt-1'>
                  <InformationCircleIcon className='w-4 h-4' />
                  State is required
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className='mt-12'>
          <h3 className='uppercase tracking-[4px] text-xs font-bold  text-gray-700'>
            Instruction for seller
          </h3>

          <div className='pt-4 flex flex-col w-full'>
            <label htmlFor='order-notes' className='capitalize text-sm'>
              Order notes
            </label>
            <textarea
              id='order-notes'
              rows={3}
              className={`px-3 py-3 ring-1 rounded text-sm focus:border-none focus:ring-2 focus:ring-main focus:outline-none mt-1 resize-none text-gray-700 w-full flex-1 ${
                errors.orderNote ? 'ring-red-600 ring-2' : 'ring-gray-300'
              }`}
              placeholder='Special instructions for seller'
              {...register('orderNote')}></textarea>
            {errors.firstName ? (
              <span className='text-xs p-1 text-red-600 flex items-center gap-2 pt-1'>
                <InformationCircleIcon className='w-4 h-4' />
                First name is required
              </span>
            ) : null}
          </div>
        </div>

        <label className='text-sm pt-5 flex items-center gap-2'>
          <input
            type='checkbox'
            className='accent-main sr-only peer'
            {...register('saveInfo')}
          />
          <div className='w-4 h-4 ring-1 relative ring-gray-400 rounded-sm after:opacity-0 peer-checked:after:opacity-100 after:transition-opacity after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:content-[""] after:w-[0.65rem] after:h-[0.65rem] after:bg-dark after:rounded-sm'></div>
          <span>Save this information for next time</span>
        </label>

        <footer className='flex flex-col md:flex-row items-center justify-between mt-10'>
          <button
            type='submit'
            className='ml-auto flex rounded justify-center bg-[#333333] text-white mt-3 md:mt-0 py-4 px-10 md:px-5 lg:px-10 text-xs font-bold uppercase w-full md:w-max tracking-[3px] lg:tracking-[4px] transition-all hover:border-main hover:bg-main active:scale-95'>
            Continue to payment
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
