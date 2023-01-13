import { TruckIcon } from '@heroicons/react/20/solid'
import { Facebook } from 'assets/icon/Facebook'
import { Instagram } from 'assets/icon/Instagram'
import { Twitter } from 'assets/icon/Twitter'

export const ProductFooter = () => {
  return (
    <footer className='mt-10'>
      <p className='text-center text-[0.7rem] font-bold uppercase tracking-[3px] text-main'>
        Free shipping on orders above N100,000
      </p>
      <div className='mt-3 flex flex-col items-center justify-center bg-gray-100 py-4 text-center text-xs text-gray-500 rounded'>
        <TruckIcon className='h-8 w-8 text-gray-600' aria-hidden='true' />
        <p className='px-4 pt-2'>
          We deliver everywhere in{' '}
          <strong className='text-main'>Lagos, Nigeria</strong> and some part of
          Nigeria.
        </p>
        <p className='pt-1'>We deliver within three (3) working days</p>
      </div>

      {/* share product */}
      <div className='mt-8 flex items-center justify-center gap-2 text-sm md:justify-end'>
        <p>Share product on:</p>

        <ul className='flex items-center gap-2'>
          <li>
            <a
              href='#'
              target='_blank'
              rel='noopener noreferrer'
              className='transition-colors hover:text-gray-800'>
              <Facebook />
            </a>
          </li>
          <li>
            <a
              href='#'
              target='_blank'
              rel='noopener noreferrer'
              className='transition-colors hover:text-gray-800'>
              <Instagram />
            </a>
          </li>
          <li>
            <a
              href='#'
              target='_blank'
              rel='noopener noreferrer'
              className='transition-colors hover:text-gray-800'>
              <Twitter />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
