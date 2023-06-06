import { CheckoutNav } from 'components/CheckoutNav'
import { DeliveryMethod } from 'components/DeliveryMethod'
import { TextInput } from 'components/TextInput'
import { states } from 'constants/states'
import { useAtom } from 'jotai'
import { CheckoutLayout } from 'layouts/CheckoutLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { userInfo } from 'store/atoms'

export type FormValues = {
  emailAddress: string
  firstName: string
  lastName: string
  phoneNumber: string
  address: string
  state: string
  city: string
  orderNote?: string
  deliveryMethod: 'ship' | 'pick up'
  saveInfo?: boolean
}

const Information = () => {
  const router = useRouter()

  const [_, setInfo] = useAtom(userInfo)
  const { handleSubmit, register, setValue, control, watch } =
    useForm<FormValues>({
      defaultValues: {
        address: '',
        city: '',
        emailAddress: '',
        firstName: '',
        lastName: '',
        orderNote: '',
        phoneNumber: '',
        state: '',
        deliveryMethod: 'ship',
        saveInfo: false,
      },
    })
  let selectedState = watch('state')

  const submitForm: SubmitHandler<FormValues> = data => {
    localStorage.setItem('lavidluxeUser', JSON.stringify(data))
    setInfo(data)
    router.push('/checkout/payment')
  }

  useEffect(() => {
    const userDetails = JSON.parse(
      localStorage.getItem('lavidluxeUser') as string
    )
    if (!userDetails) return
    setValue('address', userDetails.address)
    setValue('state', userDetails.state)
    setValue('city', userDetails.city)
    setValue('firstName', userDetails.firstName)
    setValue('lastName', userDetails.lastName)
    setValue('phoneNumber', userDetails.phoneNumber)
    setValue('emailAddress', userDetails.emailAddress)
    setValue('deliveryMethod', userDetails.deliveryMethod)
    setValue('saveInfo', userDetails.saveInfo)
  }, [setValue])

  return (
    <>
      <NextSeo title='Order Information' nofollow noindex />

      <CheckoutNav />

      <form onSubmit={handleSubmit(submitForm)}>
        {/* contact information  */}
        <div className='mt-10'>
          <h3 className='text-xs font-bold uppercase tracking-[4px] text-gray-700'>
            Contact information
          </h3>

          <TextInput
            control={control}
            label='Email Address'
            name='emailAddress'
            register={register}
            type='email'
            inputMode='email'
          />
          <TextInput
            control={control}
            label='Phone Number'
            name='phoneNumber'
            register={register}
            type='text'
            inputMode='tel'
          />
        </div>

        {/* delivery information */}
        <div className='mt-12'>
          <h3 className='text-xs font-bold uppercase tracking-[4px] text-gray-700'>
            Delivery method
          </h3>

          <DeliveryMethod control={control} name='deliveryMethod' />
        </div>

        {/* customer information */}
        <div className='mt-12'>
          <h3 className='text-xs font-bold uppercase tracking-[4px] text-gray-700'>
            Customer Information
          </h3>
          <p className='pt-1 text-xs'>
            <span className='font-bold'>NOTE:</span> If you choose{' '}
            <strong>ship</strong> as your delivery method, your package will be
            sent to the address you entered below.
          </p>

          <div className='flex w-full flex-col items-start justify-between md:gap-4 lg:flex-row lg:items-center'>
            <TextInput
              control={control}
              label='First Name'
              name='firstName'
              register={register}
              type='text'
            />
            <TextInput
              control={control}
              label='Last Name'
              name='lastName'
              register={register}
              type='text'
            />
          </div>
          <TextInput
            control={control}
            label='Address'
            name='address'
            register={register}
            type='text'
          />

          <div className='flex w-full flex-col items-start justify-between md:gap-4 lg:flex-row lg:items-center'>
            <TextInput
              control={control}
              label='State'
              name='state'
              register={register}
              type='select'
              data={states.map(state => state.name)}
            />
            <TextInput
              control={control}
              label='City'
              name='city'
              register={register}
              type='select'
              data={
                states.find(state => state.name === selectedState)
                  ?.lgas as string[]
              }
            />
          </div>
        </div>

        <div className='mt-12'>
          <h3 className='text-xs font-bold uppercase tracking-[4px]  text-gray-700'>
            Instruction for seller
          </h3>

          <TextInput
            control={control}
            label='Order Notes'
            name='orderNote'
            register={register}
            type='textarea'
          />
        </div>

        <label className='flex items-center gap-2 pt-5 text-sm'>
          <input
            type='checkbox'
            className='peer sr-only accent-main'
            {...register('saveInfo')}
          />
          <div className='relative h-4 w-4 appearance-none rounded-sm ring-1 ring-gray-400 after:absolute after:top-1/2 after:left-1/2 after:h-[0.65rem] after:w-[0.65rem] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-sm after:bg-dark after:opacity-0 after:transition-opacity after:content-[""] peer-checked:ring-dark peer-checked:after:opacity-100'></div>
          <span>Save this information for next time</span>
        </label>

        <button
          type='submit'
          className='ml-auto mt-10 flex w-full justify-center rounded bg-[#333333] py-4 px-10 text-xs font-bold uppercase tracking-[3px] text-white transition-all hover:border-main hover:bg-main active:scale-[0.98] md:w-max md:px-5 lg:px-10 lg:tracking-[4px]'>
          Continue to payment
        </button>
      </form>
    </>
  )
}

Information.getLayout = function getLayout(page: ReactElement) {
  return <CheckoutLayout>{page}</CheckoutLayout>
}

export default Information
