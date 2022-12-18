import { useAtom } from 'jotai'
import Head from 'next/head'
import { ReactElement } from 'react'
import { Layout } from '../components/Layout'
import { openCartDrawer } from '../store/drawerAtom'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import { Autoplay, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Footer } from '../components/Footer'
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
        className={`flex min-h-screen items-center transition-all bg-[#333333]/15 ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <Swiper
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          slidesPerView={'auto'}
          spaceBetween={30}
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
              subtitle='Handmade premium bespoke'
              title='Modern & edgy'
              about='We are a premium Bespoke/ready to wear clothing brand that also sells handmade luxury handbags, unisex slides, and other accessories.'
            />
          </SwiperSlide>
          <SwiperSlide>
            <HomeScreenSwiper
              className='bg-[url("../public/lavidluxe.jpg")]'
              subtitle='Handmade luxuries wears'
              title='Ready to wear'
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

      <Footer />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
