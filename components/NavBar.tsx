import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Facebook } from '../assets/icon/Facebook'
import { Instagram } from '../assets/icon/Instagram'
import { Twitter } from '../assets/icon/Twitter'

export const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const router = useRouter()
  const navs = [
    {
      id: 1,
      name: 'Home',
      route: '/',
    },
    {
      id: 2,
      name: 'Shop',
      route: '/shop/all',
    },
    {
      id: 3,
      name: 'About us',
      route: '/about-us',
    },
    {
      id: 4,
      name: 'Contact',
      route: '/contact',
    },
  ]
  return (
    <nav className=''>
      {/* menu for desktop */}
      <ul className='hidden lg:flex items-center gap-3 text-xs uppercase font-bold'>
        {navs?.map(nav => (
          <li key={nav.id}>
            <Link
              href={nav.route}
              className={`py-2 px-3 rounded transition-all ${
                router.asPath === nav.route
                  ? 'text-white font-black bg-main'
                  : 'text-gray-600 hover:text-main hover:bg-gray-50'
              }`}>
              {nav.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* menu for mobile */}
      <div
        className={`absolute top-0 left-0 bg-gray-50 border-r h-screen w-56 z-50 px-4 py-6 transition-all will-change-transform flex flex-col gap-4 lg:hidden text-xs shadow-2xl uppercase font-bold ${
          openMenu ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className='text-[0.6rem] uppercase tracking-widest font-bold self-end py-2 px-4 bg-[#8c8c8c] text-white rounded'>
          Close
        </button>

        <div className='flex flex-col gap-3 mt-2'>
          {navs?.map(nav => (
            <Link
              key={nav.id}
              href={nav.route}
              onClick={() => setOpenMenu(false)}
              className={`w-full p-4 rounded-md tracking-[3px] transition-all ${
                router.asPath === nav.route
                  ? 'text-white font-black bg-main'
                  : 'text-gray-500'
              }`}>
              {nav.name}
            </Link>
          ))}
        </div>

        <ul className='flex items-center gap-6 text-gray-500 px-4 mt-6'>
          <li>
            <a
              target='_blank'
              rel='noreferrer'
              href='#'
              className='hover:text-main transition-all p-1'>
              <Facebook />
            </a>
          </li>
          <li>
            <a
              target='_blank'
              rel='noreferrer'
              href='#'
              className='hover:text-main transition-all p-1'>
              <Twitter />
            </a>
          </li>
          <li>
            <a
              target='_blank'
              rel='noreferrer'
              href='#'
              className='hover:text-main transition-all p-1'>
              <Instagram />
            </a>
          </li>
        </ul>
      </div>

      <button
        onClick={() => setOpenMenu(!openMenu)}
        className='block lg:hidden text-xs uppercase tracking-widest font-bold py-2 px-3 bg-gray-100 rounded'>
        {/* <Bars3Icon className='w-5 h-5 text-gray-700' /> */}
        menu
      </button>
    </nav>
  )
}
