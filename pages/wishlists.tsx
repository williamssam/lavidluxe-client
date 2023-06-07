import { XCircleIcon } from '@heroicons/react/20/solid'
import { ProductDetail } from 'components/ProductDetail'
import { useAtom } from 'jotai'
import { Layout } from 'layouts/Layout'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { openCartDrawer } from 'store/atoms'
import { useWishlistsStore } from 'store/wishlistsStore'

const Wishlists = () => {
  const [openCart] = useAtom(openCartDrawer)
  const wishlists = useWishlistsStore(state => state.wishlists)
  const router = useRouter()

  return (
    <>
      <NextSeo title='Wishlist' />

      <main
        className={`px-5 pt-24 transition-all md:px-20 md:pt-28 ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <h2 className='text-center font-vollkorn text-xl font-bold uppercase tracking-[5px] text-dark md:text-3xl'>
          My Wishlists 😍
        </h2>
        <p className='mx-auto max-w-[60ch] text-center text-xs'>
          Your wishlists are stored in your current device.
        </p>

        {wishlists.length ? (
          <div className='my-14 grid grid-cols-1 gap-x-6 gap-y-12 pt-5 transition-all sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
            {wishlists.map(wishlist => (
              <ProductDetail
                product={wishlist}
                key={wishlist._id}
                category={wishlist.category}
              />
            ))}
          </div>
        ) : (
          <div className='mx-auto mt-20 flex w-max flex-col items-center rounded bg-gray-100 py-6 px-3 font-vollkorn lg:px-16'>
            <XCircleIcon className='h-12 w-12' />
            <p className='mt-3'>
              Looks like you don&apos;t have any wishlists..
            </p>
            <Link
              href='/shop/women-wears'
              className='inline-block pt-1 text-main transition-colors hover:text-dark hover:underline'>
              Continue Shopping
            </Link>
          </div>
        )}
      </main>
    </>
  )
}

Wishlists.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Wishlists
