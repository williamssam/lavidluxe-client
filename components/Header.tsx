import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/20/solid'
import logo from 'assets/images/logo-two.png'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { openCartDrawer } from 'store/atoms'
import { useCartStore } from 'store/cartStore'
import { useWishlistsStore } from 'store/wishlistsStore'
import { NavBar } from './NavBar'

const Header = () => {
  const [openCart, setOpenCart] = useAtom(openCartDrawer)
  const cart = useCartStore(state => state.cart)
  const wishlists = useWishlistsStore(state => state.wishlists)
  const router = useRouter()

  return (
    <header
      className={`absolute left-1/2 top-0 right-0 z-50 flex w-full max-w-[115rem] -translate-x-1/2 items-center justify-between bg-transparent px-2 py-3 text-gray-900 md:px-10 ${
        openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
      }`}>
      <h1 className='order-2 text-xl uppercase text-gray-600 lg:order-1'>
        <Link
          href='/'
          className='flex items-center gap-2 font-black text-gray-800'>
          <Image alt='lavidluxe logo' src={logo} width={40} />
          <span className='hidden md:inline-block'>Lavidluxe</span>
        </Link>
      </h1>

      <NavBar />

      <div className='order-3 flex items-center md:gap-3'>
        <Link
          href='/wishlists'
          className={`hidden items-center gap-2 rounded py-2 px-3 tracking-wider transition-all md:flex ${
            router.asPath === '/wishlists'
              ? 'bg-dark text-white'
              : 'text-main hover:bg-gray-100 hover:text-main'
          }`}>
          <HeartIcon className='h-4 w-4' />
          <span className='hidden text-xs font-bold uppercase lg:block'>
            Wishlists
          </span>
          {wishlists.length ? (
            <span className='flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-main text-xs font-bold group-hover:border-white'>
              {wishlists?.length}
            </span>
          ) : null}
        </Link>
        <button
          onClick={() => setOpenCart(!openCart)}
          className='group flex items-center gap-2 rounded py-2 px-3 text-main transition-all hover:bg-main hover:text-white'>
          <ShoppingBagIcon className='h-4 w-4' aria-hidden='true' />
          <span className='hidden text-xs font-bold uppercase tracking-wider lg:block'>
            Cart
          </span>
          {cart.length ? (
            <span className='flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-main text-xs font-bold group-hover:border-white'>
              {cart?.length}
            </span>
          ) : null}
        </button>
      </div>
    </header>
  )
}
export default Header
