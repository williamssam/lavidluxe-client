import { useAtom } from 'jotai'
import Head from 'next/head'
import Image from 'next/image'
import { ReactElement } from 'react'
import { Layout } from '../components/Layout'
import hero from '../public/lavidluxe-two.jpg'
import { openCartDrawer } from '../store/drawerAtom'

const AboutUs = () => {
  const [openCart] = useAtom(openCartDrawer)

  return (
    <>
      <Head>
        <title>About Us - Lavidluxe</title>
      </Head>
      <main
        className={`min-h-screen flex flex-col lg:flex-row items-center px-4 lg:px-20 justify-center pt-20 lg:pt-10 transition-all ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <article className='max-w-[70ch] lg:w-[55ch] mx-auto md:text-center lg:text-left py-6 lg:py-0 order-2 lg:order-1'>
          <h2 className='text-3xl lg:text-5xl uppercase tracking-[5px] md:tracking-[10px] font-vollkorn font-bold text-main'>
            About us 😎
          </h2>

          <div className='text-base lg:text-lg flex flex-col gap-5 mdlg:gap-6 leading-7 lg:leading-9 md:leading-10'>
            <p className='pt-3 lg:pt-6'>
              We are a premium bespoke and ready to wear brand, that offer
              quality yet affordable female dresses, male dresses, hoodies and
              joggers co-ord sets, luxury handmade unisex footwear and bags.
            </p>
            <p>
              Our passion for creativity and quality is fueled by the need to
              adorn women and men of different color, shape and size with unique
              and timeless pieces to stand out anywhere in the world.
            </p>
            <p>
              We are constantly improving our creativity and style to blend with
              daily fashion trends. Diligent and meticulous to ensure quality
              delivery and customer satisfaction.
            </p>
            <p className='uppercase tracking-widest text-sm text-center md:text-left font-bold text-main'>
              Be classy, Be beautiful, join the ageless adventure geng! 🚀😍
            </p>
          </div>
        </article>

        <section className='md:my-0 lg:pl-10 order-1 lg:order-2'>
          <Image
            src={hero}
            alt='product image'
            className='w-[30rem] h-full object-cover rounded'
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
