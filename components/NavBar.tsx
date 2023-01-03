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

export const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const router = useRouter()
  const navs = [
    {
      id: 1,
      name: 'Home',
      route: '/',
      icon: <HomeIcon className='w-4 h-4' />,
    },
    {
      id: 2,
      name: 'Shop',
      route: '/shop/all',
      icon: <BuildingStorefrontIcon className='w-4 h-4' />,
    },
    {
      id: 3,
      name: 'About us',
      route: '/about-us',
      icon: <UserGroupIcon className='w-4 h-4' />,
    },
    {
      id: 4,
      name: 'Contact',
      route: '/contact',
      icon: <DevicePhoneMobileIcon className='w-4 h-4' />,
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
          className='text-[0.6rem] uppercase tracking-widest font-bold self-end py-2 px-3 bg-gray-400 text-white rounded flex items-center gap-2'>
          <XMarkIcon className='w-4 h-4' />
          <span>Close</span>
        </button>

        <div className='flex flex-col gap-3 mt-2'>
          {navs?.map(nav => (
            <Link
              key={nav.id}
              href={nav.route}
              onClick={() => setOpenMenu(false)}
              className={`w-full py-3 px-4 rounded-md tracking-[3px] flex items-center gap-4 transition-all ${
                router.asPath === nav.route
                  ? 'text-white font-black bg-main'
                  : 'text-gray-500'
              }`}>
              <span
                className={`bg-white py-1 px-4 rounded ${
                  router.asPath === nav.route
                    ? 'text-main bg-white py-1 px-4'
                    : 'text-current bg-transparent py-0 px-0'
                }`}>
                {nav.icon}
              </span>
              <span>{nav.name}</span>
            </Link>
          ))}
        </div>

        <ul className='flex items-center gap-6 text-gray-500 px-4 mt-6'>
          <li>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='#'
              className='hover:text-main transition-all p-1'>
              <Facebook />
            </a>
          </li>
          <li>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='#'
              className='hover:text-main transition-all p-1'>
              <Twitter />
            </a>
          </li>
          <li>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='#'
              className='hover:text-main transition-all p-1'>
              <Instagram />
            </a>
          </li>
        </ul>

        <a
          href='https://williamssam.netlify.app/'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-gray-300 text-gray-600 text-[0.55rem] text-center capitalize p-1 rounded mt-auto flex flex-col items-center'>
          <p>&copy; {new Date().getFullYear()}, Lavidluxe</p>
          <p>Designed and built by Williams Samuel</p>
        </a>
      </div>

      <button
        onClick={() => setOpenMenu(!openMenu)}
        className='block lg:hidden text-xs uppercase tracking-widest font-bold py-2 px-3 bg-gray-100 rounded'>
        Menu
      </button>
    </nav>
  )
}
