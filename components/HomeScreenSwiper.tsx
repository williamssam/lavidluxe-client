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
      className={`grid bg-no-repeat bg-cover lg:bg-auto h-screen px-1 md:px-10 pb-6 lg:pb-20 ${className}`}>
      <div className='flex flex-col bg-[#333333] lg:bg-transparent self-end justify-items-end lg:items-end lg:justify-end h-max lg:h-full gap-3 px-[0.8rem] py-4 md:p-10 lg:p-0 rounded'>
        <h2 className='text-gray-300 lg:text-main text-center uppercase tracking-[3px] md:tracking-[6px] text-[0.7rem] lg:text-sm font-bold'>
          {subtitle}
        </h2>
        <p className='font-vollkorn text-[2.3rem] text-center lg:text-right lg:text-[5rem] capitalize text-white lg:text-gray-900 tracking-wide leading-[0.8]'>
          {title}
        </p>
        <p className='lg:max-w-[60ch] text-sm text-center lg:text-right text-gray-400 lg:text-gray-600 lg:pt-2'>
          {about}
        </p>
        <Link
          href='/shop/all'
          className='bg-white lg:bg-[#333333] text-center py-4 mt-1 lg:mt-5 rounded hover:bg-main transition-all px-8 md:px-10 text-xs font-bold uppercase tracking-[3px] md:tracking-[5px] text-[#333333] lg:text-white'>
          Start shopping now
        </Link>
      </div>
    </div>
  )
}
