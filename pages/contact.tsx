import { AtSymbolIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { useAtom } from 'jotai'
import Head from 'next/head'
import { ReactElement } from 'react'
import { Facebook } from '../assets/icon/Facebook'
import { Instagram } from '../assets/icon/Instagram'
import { Whatsapp } from '../assets/icon/Whatsapp'
import { Layout } from '../components/Layout'
import { TextInput } from '../components/TextInput'
import { openCartDrawer } from '../store/drawerAtom'

const Contact = () => {
  const [openCart] = useAtom(openCartDrawer)

  return (
    <>
      <Head>
        <title>Contact - Lavidluxe</title>
      </Head>

      <main
        className={`min-h-screen pt-24 md:pt-28 px-5 md:px-20 transition-all ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <h2 className='text-3xl md:text-5xl uppercase tracking-[5px] md:tracking-[10px] font-vollkorn font-bold text-main'>
          Contact 👋
        </h2>

        <section className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='mt-1 md:mt-5'>
            <ul className='grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-7 md:gap-y-10 pt-8'>
              <li>
                <h4 className='uppercase tracking-[3px] text-xs font-bold flex items-center gap-2 bg-gray-200 w-max py-1 px-3'>
                  Address <MapPinIcon className='w-4 h-4' />
                </h4>
                <p className='pt-1'>No 11, Isashi Road, Ojo Lagos</p>
              </li>
              <li>
                <h4 className='uppercase tracking-[3px] text-xs font-bold flex items-center gap-2 bg-gray-200 w-max py-1 px-3'>
                  Email <AtSymbolIcon className='w-4 h-4' />
                </h4>
                <a
                  href='mailto:lavidluxe@gmail.com'
                  className='hover:text-main transition-colors pt-1'>
                  lavidluxe@gmail.com
                </a>
              </li>
              <li>
                <h4 className='uppercase tracking-[3px] text-xs font-bold flex items-center gap-2 bg-gray-200 w-max py-1 px-3'>
                  Phone <PhoneIcon className='w-4 h-4' />
                </h4>
                <a
                  href='tel:+2348162234838'
                  className='hover:text-main transition-colors pt-1'>
                  +234 816 223 4838
                </a>
              </li>
              <li>
                <h4 className='uppercase tracking-[3px] text-xs font-bold flex items-center gap-2 bg-gray-200 w-max py-1 px-3'>
                  Whatsapp <Whatsapp />
                </h4>
                <a
                  href='https://api.whatsapp.com/send?phone=2347010126912&text=Welcome%20to%20Lavidluxe!!!'
                  className='hover:text-main transition-colors pt-1'>
                  +234 701 012 6912
                </a>
              </li>
              <li>
                <h4 className='uppercase tracking-[3px] text-xs font-bold flex items-center gap-2 bg-gray-200 w-max py-1 px-3'>
                  Facebook <Facebook />
                </h4>
                <a
                  href='https://www.facebook.com/lavidluxe'
                  className='hover:text-main transition-colors pt-1'>
                  @lavidluxe
                </a>
              </li>
              <li>
                <h4 className='uppercase tracking-[3px] text-xs font-bold flex items-center gap-2 bg-gray-200 w-max py-1 px-3'>
                  Instagram <Instagram />
                </h4>
                <a
                  href='https://www.instagram.com/lavidluxe/'
                  className='hover:text-main transition-colors pt-1'>
                  @lavidluxe
                </a>
              </li>
            </ul>

            <div className='w-full mt-8'>
              <iframe
                width='100%'
                height='250'
                // frameBorder={}='0'
                // scrolling='no'
                // marginHeight={0}
                // marginWidth={0}
                src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Isashi%C2%A0Road,%C2%A0Ojo%C2%A0Lagos+(Lavidluxe)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'>
                <a href='https://www.maps.ie/distance-area-calculator.html'>
                  measure area map
                </a>
              </iframe>
            </div>
          </div>

          <div className='px-0 pb-6 lg:pb-0 xl:px-24'>
            <form>
              <TextInput label='Name' type='text' placeholder='' id='name' />

              <div className='mt-3'>
                <TextInput
                  label='Email'
                  type='email'
                  placeholder=''
                  id='email'
                />
              </div>

              <div className='mt-7'>
                <label htmlFor='message' className='capitalize text-sm'>
                  Your message
                </label>
                <textarea
                  name='message'
                  id='message'
                  className='px-3 py-3 ring-1 text-sm ring-gray-300 flex-1 focus:border-none focus:ring-2 focus:ring-blue-700 focus:outline-none mt-1 text-gray-700 h-52 w-full resize-none'></textarea>
              </div>

              <button
                type='submit'
                className='flex justify-center bg-[#333333] rounded w-full mt-5 text-white py-4 px-10 text-xs font-bold uppercase tracking-[5px] transition-all hover:border-main hover:bg-main active:scale-95'>
                Submit
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

Contact.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Contact
