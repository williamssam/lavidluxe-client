import { TruckIcon } from '@heroicons/react/20/solid'
import { Facebook } from 'assets/icon/Facebook'
import { Twitter } from 'assets/icon/Twitter'
import { Whatsapp } from 'assets/icon/Whatsapp'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'
import { useState } from 'react'

type ProductFooterProps = {
  name: string
}

export const ProductFooter = ({ name }: ProductFooterProps) => {
  const [pageUrl, setPageUrl] = useState('')

  useIsomorphicLayoutEffect(() => {
    setPageUrl(window.location.href)
  }, [])

  return (
    <footer className='mt-10'>
      <p className='text-center text-[0.7rem] font-bold uppercase tracking-[3px] text-main'>
        Free shipping on orders above N100,000
      </p>
      <div className='mt-3 flex flex-col items-center justify-center rounded bg-gray-100 py-4 text-center text-xs text-gray-500'>
        <TruckIcon className='h-8 w-8 text-gray-600' aria-hidden='true' />
        <p className='px-4 pt-2'>
          We deliver everywhere in{' '}
          <strong className='text-main'>Lagos, Nigeria</strong> and some part of
          Nigeria.
        </p>
        <p className='pt-1'>We deliver within three (3) working days</p>
      </div>

      {/* share product */}
      <div className='mt-8 flex flex-col items-center justify-center gap-2 text-sm md:flex-row md:justify-end'>
        <p>Share product on:</p>

        <ul className='flex flex-wrap items-center gap-2'>
          <li>
            <a
              href={`https://www.facebook.com/sharer.php?u=${pageUrl}`}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1 rounded bg-main py-1 px-2 text-white transition-opacity hover:opacity-80'>
              <Facebook />
              <span className='text-xs'>Facebook</span>
            </a>
          </li>
          <li>
            <a
              href={`https://twitter.com/intent/tweet?url=${pageUrl}&text=${name}`}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1 rounded bg-blue-600 py-1 px-2 text-white transition-opacity hover:opacity-80'>
              <Twitter />
              <span className='text-xs'>Twitter</span>
            </a>
          </li>
          <li>
            <a
              href={`whatsapp://send?text=${name}%20${pageUrl}`}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1 rounded bg-green-600 py-1 px-2 text-white transition-opacity hover:opacity-80'>
              <Whatsapp />
              <span className='text-xs'>Whatsapp</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
