import { useAtom } from 'jotai'
import Head from 'next/head'
import Image from 'next/image'
import { ReactElement } from 'react'
import { Facebook } from '../assets/icon/Facebook'
import { Instagram } from '../assets/icon/Instagram'
import { Twitter } from '../assets/icon/Twitter'
import logo from '../assets/images/logo-two.png'
import { Layout } from '../components/Layout'
import { openCartDrawer } from '../store/drawerAtom'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import { Autoplay, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { HomeScreenSwiper } from '../components/HomeScreenSwiper'

const Home = () => {
  const [openCart] = useAtom(openCartDrawer)

  return (
    <>
      <Head>
        <title>Home - Lavidluxe</title>
      </Head>
      {/*  */}
      <main
        className={`flex min-h-screen items-center transition-all ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <Swiper
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          // pagination={{ clickable: true }}
          className='mySwiper'>
          <SwiperSlide>
            <HomeScreenSwiper
              className='bg-[url("../public/lavidluxe-two.jpg")]'
              subtitle='Welcome to our homepage'
              title='Modern & edgy'
              about='We are a premium Bespoke/ready to wear clothing brand that also sells handmade luxury handbags, unisex slides, and other accessories.'
            />
          </SwiperSlide>
          <SwiperSlide>
            <HomeScreenSwiper
              className='bg-[url("../public/lavidluxe.jpg")]'
              subtitle='Welcome to our homepage'
              title='Modern & edgy'
              about='We are a premium Bespoke/ready to wear clothing brand that also sells handmade luxury handbags, unisex slides, and other accessories.'
            />
          </SwiperSlide>
          <SwiperSlide>
            <HomeScreenSwiper
              className='bg-[url("https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80")]'
              subtitle='Welcome to our homepage'
              title='Modern & edgy'
              about='We are a premium Bespoke/ready to wear clothing brand that also sells handmade luxury handbags, unisex slides, and other accessories.'
            />
          </SwiperSlide>
        </Swiper>

        {/* <Image alt='laviluxe' src={lavidluxe} className='w-[0rem]' /> */}
      </main>
      <footer
        className={`bg-[#333333] px-6 py-4 text-white md:px-10 flex flex-wrap gap-5 items-center justify-between ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <div>
          <Image
            alt='lavidluxe logo'
            src={logo}
            className='w-10 object-cover invert'
          />
          <p className='text-xs pt-1'>
            copyright &copy; {new Date().getFullYear()} lavidluxe.com
          </p>
          {/* <h3 className='text-3xl font-black'>Lavidluxe</h3> */}
        </div>
        <p className='text-[0.6rem] text-gray-300'>
          Designed and developed by{' '}
          <a href='https://williamssam.nelify.app/' className='font-bold'>
            Williams Samuel
          </a>
        </p>
        <ul className='flex items-center gap-4 text-white'>
          <li>
            <a href='#' className='hover:text-main transition-all'>
              <Facebook />
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-main transition-all'>
              <Twitter />
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-main transition-all'>
              <Instagram />
            </a>
          </li>
        </ul>
      </footer>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
