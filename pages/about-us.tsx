import { useAtom } from 'jotai'
import { Layout } from 'layouts/Layout'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import hero from 'public/lavidluxe-two.jpg'
import { ReactElement } from 'react'
import { openCartDrawer } from 'store/atoms'

const AboutUs = () => {
  const [openCart] = useAtom(openCartDrawer)

  return (
    <>
      <NextSeo title='About Us' />

      <main
        className={`flex min-h-screen flex-col items-center justify-center px-4 pt-20 transition-all lg:flex-row lg:px-20 lg:pt-10 ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <article className='order-2 mx-auto max-w-[70ch] pt-12 pb-8 md:text-center lg:order-1 lg:w-[55ch] lg:py-0 lg:text-left'>
          <h2 className='font-vollkorn text-3xl font-bold uppercase tracking-[5px] text-dark md:tracking-[10px] lg:text-5xl'>
            About us 😎
          </h2>

          <div className='mdlg:gap-6 flex flex-col gap-5 text-base leading-7 md:leading-10 lg:text-lg lg:leading-9'>
            <p className='pt-3 lg:pt-6'>
              We are a premium bespoke and ready-to-wear brand that provides
              high-quality yet affordable female and male wears, hoodies and
              joggers co-ord sets, luxury handmade unisex footwear and bags.
            </p>
            <p>
              Our desire to adorn women and men of different color, shape, and
              size with unique and timeless pieces that will stand out anywhere
              in the world fuels our passion for creativity and quality.
            </p>
            <p>
              To blend with current fashion trends, we are constantly improving
              our creativity and style. We work hard and meticulously to ensure
              quality delivery and customer satisfaction.
            </p>
            <p className='text-center text-sm font-black uppercase tracking-widest text-main md:text-left'>
              Be Elegant, Be Beautiful, join us on an ageless
              adventure of fashion 🚀😍
            </p>
          </div>
        </article>

        <section className='order-1 md:my-0 lg:order-2 lg:pl-10'>
          <Image
            src={hero}
            alt='product image'
            className='h-full w-[30rem] rounded-md object-cover shadow-xl'
          />
        </section>
      </main>
    </>
  )
}

AboutUs.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default AboutUs
