import { TruckIcon } from '@heroicons/react/20/solid'
import Head from 'next/head'
import { Facebook } from '../../assets/icon/Facebook'
import { Instagram } from '../../assets/icon/Instagram'
import { Twitter } from '../../assets/icon/Twitter'
import { QuantityPicker } from '../../components/QuantityPicker'
import { Select } from '../../components/Select'

import { useAtom } from 'jotai'
import { ReactElement } from 'react'
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'
import { Layout } from '../../layouts/Layout'
import { openCartDrawer } from '../../store/drawerAtom'

const size = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
const colors = ['Black', 'Yellow', 'Green', 'Brown', 'Purple']
const price = 4000

const Details = () => {
  const [openCart] = useAtom(openCartDrawer)

  return (
    <>
      <Head>
        <title>Details - Lavidluxe</title>
      </Head>

      <main
        className={`min-h-screen items-center transition-all grid grid-cols-1 md:grid-cols-5 overflow-hidden ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <InnerImageZoom
          src='/lavidluxe.jpg'
          zoomSrc='/lavidluxe.jpg'
          className='mt-16 h-full bg-main/20 object-cover object-top md:col-span-3 md:mt-0 md:h-screen'
          zoomType='hover'
          zoomPreload={true}
          fullscreenOnMobile={true}
        />

        <section className='justify-end self-center px-3 py-5 md:col-span-2 md:px-16 md:pb-0'>
          {/* <Breadcrumbs /> */}
          {/* <BackBtn /> */}
          <header className='text-center md:text-left'>
            <h2 className='text-xl font-black uppercase tracking-[3px] text-gray-700 md:text-2xl md:tracking-[5px]'>
              The skinny in stone ponya
            </h2>
            <p className='pt-1 text-base font-bold text-gray-500'>
              {price.toLocaleString('default', {
                style: 'currency',
                currency: 'NGN',
                maximumFractionDigits: 0,
              })}
            </p>
          </header>

          <div className='max-w-[55ch] py-10 text-center font-vollkorn text-base leading-7 md:text-left'>
            <p>Form and function. Modern and minimal. Cooler than cool.</p>
            <p className='pt-2'>
              Exercitation photo booth stumptown tote bag Banksy, elit small
              batch freegan sed. Craft beer elit seitan exercitation, photo
              booth et 8-bit kale chips proident chillwave deep v laborum.
            </p>
          </div>

          <div className='flex items-center justify-between border-y border-y-[#dddddd] py-1 text-xs'>
            <div className='flex items-center gap-3'>
              <h3 className='font-bold uppercase tracking-[2px] text-gray-500'>
                Size
              </h3>
              <Select data={size} />
            </div>
            <div className='flex items-center gap-3'>
              <h3 className='font-bold uppercase tracking-[2px] text-gray-500'>
                Color
              </h3>
              <Select data={colors} />
            </div>
          </div>

          <div className='mt-8 flex flex-col items-center justify-center gap-8 md:flex-row md:justify-start'>
            <QuantityPicker />

            <button
              type='button'
              className='w-full border rounded border-[#333333] py-4 px-10 text-xs font-bold uppercase tracking-[5px] transition-all hover:border-main hover:bg-main hover:text-white active:scale-95'>
              Add to cart
            </button>
          </div>

          <footer className='mt-10'>
            <p className='text-center text-[0.7rem] font-bold uppercase tracking-[3px] text-main'>
              Free shipping on orders above N100,000
            </p>
            <div className='mt-3 flex flex-col items-center justify-center bg-gray-100 py-4 text-center text-xs text-gray-500 rounded'>
              <TruckIcon className='h-8 w-8 text-gray-600' aria-hidden='true' />
              <p className='px-4 pt-2'>
                We deliver everywhere in{' '}
                <strong className='text-main'>Lagos, Nigeria</strong> and some
                part of Nigeria.
              </p>
              <p className='pt-1'>We deliver within three (3) working days</p>
            </div>

            {/* share product */}
            <div className='mt-8 flex items-center justify-center gap-2 text-sm md:justify-end'>
              <p>Share product on:</p>

              <ul className='flex items-center gap-2'>
                <li>
                  <a href='#' className='transition-colors hover:text-gray-800'>
                    <Facebook />
                  </a>
                </li>
                <li>
                  <a href='#' className='transition-colors hover:text-gray-800'>
                    <Instagram />
                  </a>
                </li>
                <li>
                  <a href='#' className='transition-colors hover:text-gray-800'>
                    <Twitter />
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </section>
      </main>
    </>
  )
}

Details.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Details
