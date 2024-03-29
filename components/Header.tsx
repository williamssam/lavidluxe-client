import { ShoppingBagIcon } from '@heroicons/react/20/solid'
import logo from 'assets/images/logo-two.png'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { openCartDrawer } from 'store/atoms'
import { useCartStore } from 'store/cartStore'
import { NavBar } from './NavBar'

const Header = () => {
  const [openCart, setOpenCart] = useAtom(openCartDrawer)
  const cart = useCartStore(state => state.cart)

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

      <button
        onClick={() => setOpenCart(!openCart)}
        className='group order-3 flex items-center gap-2 rounded py-1 px-2 text-main transition-all hover:bg-main hover:text-white'>
        <ShoppingBagIcon className='h-5 w-5' aria-hidden='true' />
        <span className='hidden text-xs font-bold uppercase tracking-[4px] lg:block'>
          Cart
        </span>
        {cart.length ? (
          <span className='flex h-6 w-6 items-center justify-center rounded-full border-2 border-main text-xs font-bold group-hover:border-white'>
            {cart?.length}
          </span>
        ) : null}
      </button>
    </header>
  )
}
export default Header
