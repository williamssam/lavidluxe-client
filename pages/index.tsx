import { useAtom } from 'jotai'
import { Layout } from 'layouts/Layout'
import { ReactElement } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import { HomeScreenSwiper } from 'components/HomeScreenSwiper'
import { NextSeo } from 'next-seo'
import { openCartDrawer } from 'store/atoms'
import { Autoplay, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

const Home = () => {
  const [openCart] = useAtom(openCartDrawer)

  return (
    <>
      <NextSeo title='Home' />

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
              subtitle='Welcome to our website'
              title='Modern & luxuries'
              about='We are a premium Bespoke/ready to wear clothing brand that also sells handmade luxury handbags, unisex slides, and other accessories.'
            />
          </SwiperSlide>
          <SwiperSlide>
            <HomeScreenSwiper
              className='bg-[url("../public/lavidluxe.jpg")]'
              subtitle='Premium bespoke brand'
              title='Ready to wear'
              about='We are a premium Bespoke/ready to wear clothing brand that also sells handmade luxury handbags, unisex slides, and other accessories.'
            />
          </SwiperSlide>
          <SwiperSlide>
            <HomeScreenSwiper
              className='bg-[url("../public/stella.jpg")]'
              subtitle='Handmade luxuries wears'
              title='Modern & edgy'
              about='We are a premium Bespoke/ready to wear clothing brand that also sells handmade luxury handbags, unisex slides, and other accessories.'
            />
          </SwiperSlide>
        </Swiper>
      </main>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
