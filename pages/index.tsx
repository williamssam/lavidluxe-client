import { useAtom } from 'jotai'
import { Layout } from 'layouts/Layout'
import Head from 'next/head'
import { ReactElement } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import { Footer } from 'components/Footer'
import { HomeScreenSwiper } from 'components/HomeScreenSwiper'
import { openCartDrawer } from 'store/atoms'
import { Autoplay, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

const Home = () => {
  const [openCart] = useAtom(openCartDrawer)

  return (
    <>
      <Head>
        <title>Lavidluxe Clothing</title>
      </Head>
      {/*  */}
      <main
        className={`bg-[#333333]/15 flex min-h-screen items-center transition-all ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <Swiper
          autoplay={{
            delay: 2000,
            pauseOnMouseEnter: true,
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
              subtitle='Premium bespoke brand'
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
              className='bg-[url("../public/stella.jpg")]'
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
