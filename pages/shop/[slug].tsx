import { useAtom } from 'jotai'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement, useState } from 'react'
import logo from '../../assets/images/logo-three.png'
import { Filter } from '../../components/Filter'
import { Layout } from '../../components/Layout'
import { StoreLayout } from '../../components/StoreLayout'
import laviduxe from '../../public/lavidluxe-two.jpg'
import { openCartDrawer } from '../../store/drawerAtom'

const Store = () => {
  const products = [
    {
      id: 1,
      name: 'The skinny in stone pony',
      price: 175,
      image:
        'http://cubecreationthemes.com/html/lola/images/Shop/shop-img-hover-2.jpg',
    },
    {
      id: 2,
      name: 'The skinny in stone pony',
      price: 175,
      image:
        'http://cubecreationthemes.com/html/lola/images/Shop/shop-img-hover-2.jpg',
    },
    {
      id: 3,
      name: 'The skinny in stone pony',
      price: 325,
      image:
        'http://cubecreationthemes.com/html/lola/images/Shop/shop-img-hover-7.jpg',
    },
    {
      id: 4,
      name: 'The skinny in stone pony',
      price: 125,
      image:
        'http://cubecreationthemes.com/html/lola/images/Shop/shop-img-hover-4.jpg',
    },
  ]
  const [column, setColumn] = useState(2)
  const [openCart] = useAtom(openCartDrawer)

  return (
    <>
      <Head>
        <title>Shop - Lavidluxe</title>
      </Head>

      <main
        className={`min-h-screen px-4 py-10 md:pt-20 md:pb-10 md:px-10 transition-all ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        {/* <p>Store</p> */}

        <StoreLayout>
          <Filter setColumn={setColumn} column={column} />
          {/* products */}
          <div
            className={`grid grid-cols-1 gap-x-5 gap-y-10 pt-3 transition-all sm:grid-cols-2 ${
              column === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
            }`}>
            {products?.map(product => (
              <Link
                href='/shop/details'
                key={product.id}
                className='group transition-colors'>
                <div className='relative'>
                  <Image
                    alt='product'
                    src={laviduxe}
                    className='h-80 lg:h-[35rem] rounded object-cover object-top'
                    // src='http://cubecreationthemes.com/html/lola/images/Shop/shop-img-hover-4.jpg'
                  />
                  <Image
                    alt='lavidluxe logo'
                    src={logo}
                    className='w-14 object-cover absolute right-6 bottom-5 opacity-70'
                  />
                </div>
                <div className='text-center'>
                  <p className='pt-6 text-[0.63rem] font-semibold uppercase tracking-[2px] text-[#333333] group-hover:text-blue-700 md:text-xs md:tracking-[4px]'>
                    The skinny in stone pony
                  </p>
                  <p className='pt-2 text-xs text-[#8c8c8c]'>$ 175.00</p>
                </div>
              </Link>
            ))}
          </div>
        </StoreLayout>
      </main>
    </>
  )
}

Store.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Store
