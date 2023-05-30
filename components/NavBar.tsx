import {
  BuildingStorefrontIcon,
  DevicePhoneMobileIcon,
  HomeIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import { Facebook } from 'assets/icon/Facebook'
import { Instagram } from 'assets/icon/Instagram'
import { Twitter } from 'assets/icon/Twitter'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const navs = [
  {
    id: 1,
    name: 'Home',
    route: '/',
    icon: <HomeIcon className='h-4 w-4' />,
  },
  {
    id: 2,
    name: 'Shop',
    route: '/shop/women-wears',
    icon: <BuildingStorefrontIcon className='h-4 w-4' />,
  },
  {
    id: 3,
    name: 'About us',
    route: '/about-us',
    icon: <UserGroupIcon className='h-4 w-4' />,
  },
  {
    id: 4,
    name: 'Contact',
    route: '/contact',
    icon: <DevicePhoneMobileIcon className='h-4 w-4' />,
  },
]

export const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const router = useRouter()
  return (
    <nav className='pt-1'>
      {/* menu for desktop */}
      <ul className='hidden items-center gap-3 text-xs font-bold uppercase lg:flex'>
        {navs?.map(nav => (
          <li key={nav.id}>
            <Link
              href={nav.route}
              className={`flex items-center gap-2 rounded py-2 px-3 transition-all ${
                router.asPath === nav.route
                  ? 'bg-dark font-black text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-main'
              }`}>
              {nav.icon}
              {nav.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* menu for mobile */}
      <div
        className={`absolute top-0 left-0 z-50 flex h-screen w-56 flex-col gap-4 border-r bg-gray-50 px-4 py-6 text-xs font-bold uppercase shadow-2xl transition-all will-change-transform lg:hidden ${
          openMenu ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className='flex items-center gap-2 self-end rounded bg-gray-400 py-2 px-3 text-[0.6rem] font-bold uppercase tracking-widest text-white'>
          <XMarkIcon className='h-4 w-4' />
          <span>Close</span>
        </button>

        <div className='mt-2 flex flex-col gap-3'>
          {navs?.map(nav => (
            <Link
              key={nav.id}
              href={nav.route}
              onClick={() => setOpenMenu(false)}
              className={`flex w-full items-center gap-4 rounded-md py-3 px-4 tracking-[3px] transition-all ${
                router.asPath === nav.route
                  ? 'bg-main font-black text-white'
                  : 'text-gray-500'
              }`}>
              <span
                className={`rounded bg-white py-1 px-4 ${
                  router.asPath === nav.route
                    ? 'bg-white py-1 px-4 text-main'
                    : 'bg-transparent py-0 px-0 text-current'
                }`}>
                {nav.icon}
              </span>
              <span>{nav.name}</span>
            </Link>
          ))}
        </div>

        <ul className='mt-6 flex items-center gap-6 px-4 text-gray-500'>
          <li>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='#'
              className='p-1 transition-all hover:text-main'>
              <Facebook />
            </a>
          </li>
          <li>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='#'
              className='p-1 transition-all hover:text-main'>
              <Twitter />
            </a>
          </li>
          <li>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='#'
              className='p-1 transition-all hover:text-main'>
              <Instagram />
            </a>
          </li>
        </ul>

        <a
          href='https://williamssam.netlify.app/'
          target='_blank'
          rel='noopener noreferrer'
          className='mt-auto flex flex-col items-center rounded bg-gray-300 p-1 text-center text-[0.55rem] capitalize text-gray-600'>
          <p>&copy; {new Date().getFullYear()}, Lavidluxe Clothing</p>
          <p>Designed and built by Williams Samuel</p>
        </a>
      </div>

      <button
        onClick={() => setOpenMenu(!openMenu)}
        className='block rounded bg-gray-100 py-2 px-3 text-xs font-bold uppercase tracking-widest lg:hidden'>
        Menu
      </button>
    </nav>
  )
}
