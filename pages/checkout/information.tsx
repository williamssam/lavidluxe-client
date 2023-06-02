import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { CheckoutNav } from 'components/CheckoutNav'
import { Select } from 'components/Select'
import { states } from 'constants/states'
import { useAtom } from 'jotai'
import { CheckoutLayout } from 'layouts/CheckoutLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { userInfo } from 'store/atoms'

export type FormValues = {
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
    control,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      address: '',
      city: '',
      emailAddress: '',
      firstName: '',
      lastName: '',
      orderNote: '',
      phoneNumber: '',
      saveInfo: false,
      state: '',
    },
  })
  let selectedState = watch('state')

  const submitForm: SubmitHandler<FormValues> = data => {
    if (data.saveInfo) {
      localStorage.setItem('userInfo', JSON.stringify(data))
    }
    delete data.saveInfo
    setInfo(data)
    router.push('/checkout/payment')
  }

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userInfo') as string)
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
          <h3 className='text-xs font-bold uppercase tracking-[4px] text-gray-700'>
            Contact information
          </h3>

          <div className='flex w-full flex-col pt-4'>
            <label htmlFor='email-address' className='text-sm capitalize'>
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
              className={`mt-1 w-full flex-1 appearance-none rounded px-3 py-3 text-sm text-gray-700 ring-1 focus:border-none focus:outline-none focus:ring-2 focus:ring-main ${
                errors.emailAddress ? 'ring-2 ring-red-600' : 'ring-gray-300'
              }`}
            />
            {errors.emailAddress?.type === 'required' ? (
              <span className='flex items-center gap-2 p-1 pt-1 text-xs text-red-600'>
                <InformationCircleIcon className='h-4 w-4' />
                Email Address is required
              </span>
            ) : null}
            {errors.emailAddress?.type === 'pattern' ? (
              <span className='flex items-center gap-2 p-1 pt-1 text-xs text-red-600'>
                <InformationCircleIcon className='h-4 w-4' />
                Invalid email address
              </span>
            ) : null}
          </div>

          <div className='flex w-full flex-col pt-4'>
            <label htmlFor='phoneNumber' className='text-sm capitalize'>
              Phone Number
            </label>
            <input
              type='tel'
              {...register('phoneNumber', {
                required: true,
              })}
              id='phoneNumber'
              className={`mt-1 w-full flex-1 appearance-none rounded px-3 py-3 text-sm text-gray-700 ring-1 focus:border-none focus:outline-none focus:ring-2 focus:ring-main ${
                errors.phoneNumber ? 'ring-2 ring-red-600' : 'ring-gray-300'
              }`}
            />
            {errors.phoneNumber ? (
              <span className='flex items-center gap-2 p-1 pt-1 text-xs text-red-600'>
                <InformationCircleIcon className='h-4 w-4' />
                Phone number is required
              </span>
            ) : null}
          </div>
        </div>

        <div className='mt-12'>
          <div className='flex items-center justify-between text-xs'>
            <h3 className='text-xs font-bold uppercase tracking-[4px] text-gray-700'>
              Shipping Information
            </h3>
          </div>

          <div className='flex w-full flex-col items-start justify-between md:gap-4 lg:flex-row lg:items-center'>
            <div className='flex w-full flex-col pt-4'>
              <label htmlFor='first-name' className='text-sm capitalize'>
                First Name
              </label>
              <input
                type='text'
                {...register('firstName', {
                  required: true,
                })}
                id='first-name'
                className={`mt-1 w-full flex-1 appearance-none rounded px-3 py-3 text-sm text-gray-700 ring-1 focus:border-none focus:outline-none focus:ring-2 focus:ring-main ${
                  errors.firstName ? 'ring-2 ring-red-600' : 'ring-gray-300'
                }`}
              />
              {errors.firstName ? (
                <span className='flex items-center gap-2 p-1 pt-1 text-xs text-red-600'>
                  <InformationCircleIcon className='h-4 w-4' />
                  First name is required
                </span>
              ) : null}
            </div>
            <div className='flex w-full flex-col pt-4'>
              <label htmlFor='last-name' className='text-sm capitalize'>
                Last Name
              </label>
              <input
                type='text'
                {...register('lastName', {
                  required: true,
                })}
                id='last-name'
                className={`mt-1 w-full flex-1 appearance-none rounded px-3 py-3 text-sm text-gray-700 ring-1 focus:border-none focus:outline-none focus:ring-2 focus:ring-main ${
                  errors.lastName ? 'ring-2 ring-red-600' : 'ring-gray-300'
                }`}
              />
              {errors.lastName ? (
                <span className='flex items-center gap-2 p-1 pt-1 text-xs text-red-600'>
                  <InformationCircleIcon className='h-4 w-4' />
                  Last name is required
                </span>
              ) : null}
            </div>
          </div>
          <div className='flex w-full flex-col pt-4'>
            <label htmlFor='address' className='text-sm capitalize'>
              Address
            </label>
            <input
              type='text'
              {...register('address', {
                required: true,
              })}
              id='address'
              className={`mt-1 w-full flex-1 appearance-none rounded px-3 py-3 text-sm text-gray-700 ring-1 focus:border-none focus:outline-none focus:ring-2 focus:ring-main ${
                errors.address ? 'ring-2 ring-red-600' : 'ring-gray-300'
              }`}
            />
            {errors.address ? (
              <span className='flex items-center gap-2 p-1 pt-1 text-xs text-red-600'>
                <InformationCircleIcon className='h-4 w-4' />
                Shipping address is required
              </span>
            ) : null}
          </div>

          <div className='flex w-full flex-col items-start justify-between md:gap-4 lg:flex-row lg:items-center'>
            <div className='flex w-full flex-col pt-4'>
              <label htmlFor='state' className='text-sm capitalize'>
                State
              </label>
              <Controller
                name='state'
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      data={states.map(state => state.name)}
                      selected={field.value}
                      setSelected={field.onChange}
                      className={`mt-1 w-full flex-1 appearance-none rounded !p-3 text-sm text-gray-700 ring-1 focus:border-none focus:outline-none focus:ring-2 focus:ring-main ${
                        errors.state ? 'ring-2 ring-red-600' : 'ring-gray-300'
                      }`}
                    />
                  </>
                )}
              />
              {errors.state ? (
                <span className='flex items-center gap-2 p-1 pt-1 text-xs text-red-600'>
                  <InformationCircleIcon className='h-4 w-4' />
                  State is required
                </span>
              ) : null}
            </div>
            <div className='flex w-full flex-col pt-4'>
              <label htmlFor='state' className='text-sm capitalize'>
                City
              </label>
              <Controller
                name='city'
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      data={
                        states.find(state => state.name === selectedState)
                          ?.lgas as string[]
                      }
                      selected={field.value}
                      setSelected={field.onChange}
                      className={`mt-1 w-full flex-1 appearance-none rounded !p-3 text-sm text-gray-700 ring-1 focus:border-none focus:outline-none focus:ring-2 focus:ring-main ${
                        errors.city ? 'ring-2 ring-red-600' : 'ring-gray-300'
                      }`}
                    />
                  </>
                )}
              />
              {errors.city ? (
                <span className='flex items-center gap-2 p-1 pt-1 text-xs text-red-600'>
                  <InformationCircleIcon className='h-4 w-4' />
                  City is required
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className='mt-12'>
          <h3 className='text-xs font-bold uppercase tracking-[4px]  text-gray-700'>
            Instruction for seller
          </h3>

          <div className='flex w-full flex-col pt-4'>
            <label htmlFor='order-notes' className='text-sm capitalize'>
              Order notes
            </label>
            <textarea
              id='order-notes'
              rows={3}
              className={`mt-1 w-full flex-1 resize-none appearance-none rounded px-3 py-3 text-sm text-gray-700 ring-1 focus:border-none focus:outline-none focus:ring-2 focus:ring-main ${
                errors.orderNote ? 'ring-2 ring-red-600' : 'ring-gray-300'
              }`}
              placeholder='Special instructions for seller'
              {...register('orderNote')}></textarea>
          </div>
        </div>

        <label className='flex items-center gap-2 pt-5 text-sm'>
          <input
            type='checkbox'
            className='peer sr-only accent-main'
            {...register('saveInfo')}
          />
          <div className='relative h-4 w-4 appearance-none rounded-sm ring-1 ring-gray-400 after:absolute after:top-1/2 after:left-1/2 after:h-[0.65rem] after:w-[0.65rem] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-sm after:bg-dark after:opacity-0 after:transition-opacity after:content-[""] peer-checked:after:opacity-100'></div>
          <span>Save this information for next time</span>
        </label>

        <footer className='mt-10 flex flex-col items-center justify-between md:flex-row'>
          <button
            type='submit'
            className='ml-auto mt-3 flex w-full justify-center rounded bg-[#333333] py-4 px-10 text-xs font-bold uppercase tracking-[3px] text-white transition-all hover:border-main hover:bg-main active:scale-[0.98] md:mt-0 md:w-max md:px-5 lg:px-10 lg:tracking-[4px]'>
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
