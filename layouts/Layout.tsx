import { ShoppingCartIcon } from '@heroicons/react/20/solid'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../assets/images/logo.png'
import { Cart } from '../components/Cart'
import { NavBar } from '../components/NavBar'
import { openCartDrawer } from '../store/drawerAtom'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const [openCart, setOpenCart] = useAtom(openCartDrawer)

  return (
    <>
      <header
        className={`absolute max-w-[115rem] left-1/2 -translate-x-1/2 top-0 right-0 z-50 flex w-full items-center justify-between bg-transparent px-2 py-3 text-gray-900 md:px-10 ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <NavBar />

        <h1 className='font-oswald text-3xl uppercase text-gray-600'>
          <Link href='/' className='text-gray-800 font-vollkorn font-black'>
            <Image
              alt='lavidluxe logo'
              src={logo}
              className='w-full h-6 md:h-10 object-cover opacity-90'
            />
          </Link>
        </h1>

        <button
          onClick={() => setOpenCart(!openCart)}
          className='group flex items-center gap-2 py-1 px-2 text-main transition-all hover:bg-main rounded hover:text-white'>
          <ShoppingCartIcon className='h-5 w-5' aria-hidden='true' />
          <p className='hidden lg:block text-xs font-bold uppercase tracking-[4px]'>
            Cart
          </p>
          <p className='flex h-6 w-6 items-center justify-center rounded-full border-2 border-main text-xs font-bold group-hover:border-white'>
            2
          </p>
        </button>
      </header>

      {children}

      {openCart ? <Cart /> : null}
    </>
  )
}
