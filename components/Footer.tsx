import { Facebook } from 'assets/icon/Facebook'
import { Instagram } from 'assets/icon/Instagram'
import { Twitter } from 'assets/icon/Twitter'
import { Whatsapp } from 'assets/icon/Whatsapp'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { openCartDrawer } from 'store/atoms'

export const Footer = () => {
  const [openCart] = useAtom(openCartDrawer)

  return (
    <footer
      className={`mt-auto flex w-full flex-wrap items-center justify-center gap-5 bg-[#333333] px-6 py-4 text-white md:justify-between md:px-10 ${
        openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
      }`}>
      <p className='pt-1 text-xs'>
        All rights reserved. &copy; {new Date().getFullYear()}{' '}
        <Link href='/'>Lavidluxe Clothings</Link>
      </p>
      <div className='flex flex-col items-center gap-1'>
        <div className='flex items-center gap-3'>
          <Link
            href='/faqs'
            className='inline-block pt-1 text-xs uppercase hover:underline'>
            Faqs
          </Link>
          <span>-</span>
          <Link
            href='/shipping-return-policy'
            className='inline-block pt-1 text-xs uppercase hover:underline'>
            Return policy
          </Link>
          <span>-</span>
          <Link
            href='/terms-of-service'
            className='inline-block pt-1 text-xs uppercase hover:underline'>
            Terms of use
          </Link>
        </div>
        <a
          href='https://williamssam.netlify.app/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-xs text-gray-300'>
          Designed and developed by{' '}
          <span className='font-bold underline'>Williams Samuel</span>
        </a>
      </div>
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
            href='https://api.whatsapp.com/send?phone=2348162234838'
            className='transition-all hover:text-main'>
            <Whatsapp />
          </a>
        </li>
      </ul>
    </footer>
  )
}
