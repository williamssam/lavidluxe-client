import { ShoppingBagIcon } from '@heroicons/react/20/solid'
import logo from 'assets/images/logo-two.png'
import { Cart } from 'components/Cart'
import { Footer } from 'components/Footer'
import { NavBar } from 'components/NavBar'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'
import { openCartDrawer } from 'store/atoms'
import { useCartStore } from 'store/cartStore'

export const Layout = ({ children }: PropsWithChildren) => {
  const [openCart, setOpenCart] = useAtom(openCartDrawer)
  const cart = useCartStore(state => state.cart)
  const router = useRouter()

  return (
    <>
      <header
        className={`absolute left-1/2 top-0 right-0 z-50 flex w-full max-w-[115rem] -translate-x-1/2 items-center justify-between bg-transparent px-2 py-3 text-gray-900 md:px-10 ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <h1 className='order-2 text-xl uppercase text-gray-600 lg:order-1'>
          <Link
            href='/'
            className='flex items-center gap-2 font-black text-gray-800'>
            <Image alt='lavidluxe logo' src={logo} width={40} />
            <span>Lavidluxe</span>
          </Link>
        </h1>

        <NavBar />

        <button
          onClick={() => setOpenCart(!openCart)}
          className='group order-3 flex items-center gap-2 rounded py-1 px-2 text-main transition-all hover:bg-main hover:text-white'>
          <ShoppingBagIcon className='h-5 w-5' aria-hidden='true' />
          <p className='hidden text-xs font-bold uppercase tracking-[4px] lg:block'>
            Cart
          </p>
          {cart.length > 0 ? (
            <p className='flex h-6 w-6 items-center justify-center rounded-full border-2 border-main text-xs font-bold group-hover:border-white'>
              {cart?.length}
            </p>
          ) : null}
        </button>
      </header>

      {children}

      {!router.pathname.includes('shop') ? <Footer /> : null}

      {openCart ? <Cart /> : null}
    </>
  )
}
