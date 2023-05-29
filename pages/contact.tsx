import emailjs from '@emailjs/browser'
import {
  AtSymbolIcon,
  InformationCircleIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/20/solid'
import { Facebook } from 'assets/icon/Facebook'
import { Instagram } from 'assets/icon/Instagram'
import { Whatsapp } from 'assets/icon/Whatsapp'
import { Footer } from 'components/Footer'
import { Spinner } from 'components/Spinner'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { useAtom } from 'jotai'
import { Layout } from 'layouts/Layout'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { openCartDrawer } from 'store/atoms'

type FormValues = {
  emailAddress: string
  name: string
  message: string
}

const Contact = () => {
  const [openCart] = useAtom(openCartDrawer)
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<FormValues>({})

  const submitForm: SubmitHandler<FormValues> = data => {
    setLoading(true)
    emailjs
      .send(
        process.env.NEXT_PUBLIC_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
        data,
        process.env.NEXT_PUBLIC_PUBLIC_KEY as string
      )
      .then(
        result => {
          // console.log(result.text)
          setLoading(false)
          setIsSuccess(true)
        },
        error => {
          // console.log(error.text)
          setLoading(false)
        }
      )
  }

  useIsomorphicLayoutEffect(() => {
    if (isSuccess) {
      toast.success(`🥳 Message sent successfully!`)
      reset()
    }
    setIsSuccess(false)
  }, [isSuccess])

  return (
    <>
      <Head>
        <title>Contact - Lavidluxe</title>
      </Head>

      <main
        className={`min-h-screen px-5 pt-24 transition-all md:px-20 md:pt-28 ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <h2 className='font-vollkorn text-3xl font-bold uppercase tracking-[5px] text-dark md:text-5xl md:tracking-[10px]'>
          Contact 👋
        </h2>

        <section className='grid grid-cols-1 gap-10 lg:grid-cols-2'>
          <div className='mt-1 md:mt-5'>
            <ul className='grid grid-cols-1 gap-x-2 gap-y-7 pt-8 md:grid-cols-2 md:gap-y-10'>
              <li>
                <h4 className='flex w-max items-center gap-2 rounded bg-gray-200 py-1 px-3 text-xs font-bold uppercase tracking-[3px]'>
                  Address <MapPinIcon className='h-4 w-4' />
                </h4>
                <p className='flex px-2 pt-[0.15rem]'>
                  No 11, Isashi Road, Ojo Lagos
                </p>
              </li>
              <li>
                <h4 className='flex w-max items-center gap-2 rounded bg-gray-200 py-1 px-3 text-xs font-bold uppercase tracking-[3px]'>
                  Email <AtSymbolIcon className='h-4 w-4' />
                </h4>
                <a
                  href='mailto:lavidluxe@gmail.com'
                  className='flex px-2 pt-[0.15rem] transition-colors hover:text-main'>
                  lavidluxe@gmail.com
                </a>
              </li>
              <li>
                <h4 className='flex w-max items-center gap-2 rounded bg-gray-200 py-1 px-3 text-xs font-bold uppercase tracking-[3px]'>
                  Phone <PhoneIcon className='h-4 w-4' />
                </h4>
                <a
                  href='tel:+2348162234838'
                  className='flex px-2 pt-[0.15rem] transition-colors hover:text-main'>
                  +234 816 223 4838
                </a>
              </li>
              <li>
                <h4 className='flex w-max items-center gap-2 rounded bg-gray-200 py-1 px-3 text-xs font-bold uppercase tracking-[3px]'>
                  Whatsapp <Whatsapp />
                </h4>
                <a
                  href='https://api.whatsapp.com/send?phone=2347010126912&text=Welcome%20to%20Lavidluxe!!!'
                  className='flex px-2 pt-[0.15rem] transition-colors hover:text-main'>
                  +234 701 012 6912
                </a>
              </li>
              <li>
                <h4 className='flex w-max items-center gap-2 rounded bg-gray-200 py-1 px-3 text-xs font-bold uppercase tracking-[3px]'>
                  Facebook <Facebook />
                </h4>
                <a
                  href='https://www.facebook.com/lavidluxe'
                  className='flex px-2 pt-[0.15rem] transition-colors hover:text-main'>
                  @lavidluxe
                </a>
              </li>
              <li>
                <h4 className='flex w-max items-center gap-2 rounded bg-gray-200 py-1 px-3 text-xs font-bold uppercase tracking-[3px]'>
                  Instagram <Instagram />
                </h4>
                <a
                  href='https://www.instagram.com/lavidluxe/'
                  className='flex px-2 pt-[0.15rem] transition-colors hover:text-main'>
                  @lavidluxe
                </a>
              </li>
            </ul>

            <div className='mt-8 w-full'>
              <iframe
                width='100%'
                height='250'
                src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Isashi%C2%A0Road,%C2%A0Ojo%C2%A0Lagos+(Lavidluxe)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'>
                <a href='https://www.maps.ie/distance-area-calculator.html'>
                  measure area map
                </a>
              </iframe>
            </div>
          </div>

          <div className='px-0 pb-6 lg:pb-0 xl:px-24'>
            <form onSubmit={handleSubmit(submitForm)}>
              <h3 className='text=xs text-2xl font-black uppercase tracking-[4px] text-gray-700'>
                Get in touch
              </h3>
              <div className='flex w-full flex-col pt-4'>
                <label htmlFor='full-name' className='text-sm capitalize'>
                  Your name
                </label>
                <input
                  type='text'
                  {...register('name', {
                    required: true,
                  })}
                  id='full-name'
                  className={`mt-1 w-full flex-1 appearance-none rounded px-3 py-3 text-sm text-gray-700 ring-1 focus:border-none focus:outline-none focus:ring-2 focus:ring-main ${
                    errors.name ? 'ring-2 ring-red-600' : 'ring-gray-300'
                  }`}
                  placeholder='Enter your full name'
                />
                {errors.name ? (
                  <span className='flex items-center gap-2 p-1 pt-1 text-xs text-red-600'>
                    <InformationCircleIcon className='h-4 w-4' />
                    Your name is required
                  </span>
                ) : null}
              </div>
              <div className='flex w-full flex-col pt-4'>
                <label htmlFor='email-address' className='text-sm capitalize'>
                  Your email address
                </label>
                <input
                  type='email'
                  {...register('emailAddress', {
                    required: true,
                  })}
                  id='email-address'
                  className={`mt-1 w-full flex-1 appearance-none rounded px-3 py-3 text-sm text-gray-700 ring-1 focus:border-none focus:outline-none focus:ring-2 focus:ring-main ${
                    errors.emailAddress
                      ? 'ring-2 ring-red-600'
                      : 'ring-gray-300'
                  }`}
                  placeholder='Enter email address'
                />
                {errors.emailAddress ? (
                  <span className='flex items-center gap-2 p-1 pt-1 text-xs text-red-600'>
                    <InformationCircleIcon className='h-4 w-4' />
                    Your email address is required
                  </span>
                ) : null}
              </div>

              <div className='mt-7'>
                <label htmlFor='message' className='text-sm capitalize'>
                  Your message
                </label>
                <textarea
                  id='message'
                  {...register('message', {
                    required: true,
                  })}
                  className={`mt-1 h-52 w-full flex-1 resize-none appearance-none rounded px-3 py-3 text-sm text-gray-700 ring-1 ring-gray-300 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-700 ${
                    errors.message ? 'ring-2 ring-red-600' : 'ring-gray-300'
                  }`}></textarea>
                {errors.message ? (
                  <span className='flex items-center gap-2 p-1 text-xs text-red-600'>
                    <InformationCircleIcon className='h-4 w-4' />
                    Your message is required
                  </span>
                ) : null}
              </div>

              <button
                type='submit'
                disabled={loading}
                className='mt-5 flex w-full justify-center rounded bg-[#333333] py-4 px-10 text-xs font-bold uppercase tracking-[5px] text-white transition-all hover:border-main hover:bg-main active:scale-95 disabled:cursor-none disabled:opacity-30'>
                Submit
                {loading ? <Spinner /> : null}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />

      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  )
}

Contact.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Contact
