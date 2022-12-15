import Link from 'next/link'
import { useRouter } from 'next/router'

export const NavBar = () => {
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
    <nav className='hidden lg:block'>
      <ul className='flex items-center gap-3 text-xs uppercase font-bold'>
        {navs?.map(nav => (
          <li key={nav.id}>
            <Link
              href={nav.route}
              className={`py-2 px-3 rounded ${
                router.asPath === nav.route
                  ? 'text-white font-black bg-main'
                  : 'text-gray-600 hover:text-main'
              }`}>
              {nav.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
