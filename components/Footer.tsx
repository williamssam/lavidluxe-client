import { Facebook } from 'assets/icon/Facebook'
import { Instagram } from 'assets/icon/Instagram'
import { Twitter } from 'assets/icon/Twitter'
import { Whatsapp } from 'assets/icon/Whatsapp'
import logo from 'assets/images/logo-two.png'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { openCartDrawer } from 'store/atoms'

export const Footer = () => {
  const [openCart] = useAtom(openCartDrawer)

  return (
    <footer
      className={`flex flex-wrap items-center justify-between gap-5 bg-[#333333] px-6 py-4 text-white md:px-10 ${
        openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
      }`}>
      <div>
        <Image
          alt='lavidluxe logo'
          src={logo}
          className='w-10 object-cover invert'
        />
        <p className='pt-1 text-xs'>
          All rights reserved. &copy; {new Date().getFullYear()}{' '}
          <Link href='/'>Lavidluxe</Link>
        </p>
      </div>
      <a
        href='https://williamssam.netlify.app/'
        target='_blank'
        rel='noopener noreferrer'
        className='text-xs text-gray-300'>
        Designed and developed by{' '}
        <span className='font-bold underline'>Williams Samuel</span>
      </a>
      <ul className='flex items-center gap-4 text-white'>
        <li>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://web.facebook.com/boschicwardrobe'
            className='transition-all hover:text-main'>
            <Facebook />
          </a>
        </li>
        <li>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://twitter.com/lavidluxe'
            className='transition-all hover:text-main'>
            <Twitter />
          </a>
        </li>
        <li>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.instagram.com/lavidluxe_clothing/'
            className='transition-all hover:text-main'>
            <Instagram />
          </a>
        </li>
        <li>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://api.whatsapp.com/send?phone=2347010126912'
            className='transition-all hover:text-main'>
            <Whatsapp />
          </a>
        </li>
      </ul>
    </footer>
  )
}
