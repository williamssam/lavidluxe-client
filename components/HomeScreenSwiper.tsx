import { ArrowLongRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

type HomeScreenSwiperProps = {
  subtitle: string
  title: string
  about: string
  className: string
}

export const HomeScreenSwiper = ({
  subtitle,
  title,
  about,
  className,
}: HomeScreenSwiperProps) => {
  return (
    <div
      className={`grid h-screen bg-cover bg-no-repeat px-2 pb-6 md:px-10 lg:bg-auto lg:pb-20 ${className}`}>
      <div className='flex h-max flex-col justify-items-end gap-3 self-end rounded-md bg-[#333333] p-5 md:p-10 lg:h-full lg:items-end lg:justify-end lg:bg-transparent lg:p-0'>
        <h2 className='text-center text-[0.65rem] font-bold uppercase tracking-[3px] text-gray-300 md:tracking-[6px] lg:text-sm lg:text-main'>
          {subtitle}
        </h2>
        <p className='text-center font-vollkorn text-[2.3rem] capitalize leading-[0.8] tracking-wide text-white lg:text-right lg:text-[5rem] lg:text-gray-900'>
          {title}
        </p>
        <p className='pt-3 text-center text-sm text-gray-400 lg:max-w-[60ch] lg:pt-2 lg:text-right lg:text-gray-600'>
          {about}
        </p>
        <Link
          href='/shop/women-wears'
          className='mt-2 flex items-center justify-center gap-5 rounded bg-white py-4 px-8 text-xs font-bold uppercase tracking-[3px] text-[#333333] transition-all hover:bg-main hover:text-white md:px-10 md:tracking-[5px] lg:mt-5 lg:bg-[#333333] lg:text-white'>
          Start shopping now <ArrowLongRightIcon className='w-5' />
        </Link>
      </div>
    </div>
  )
}
