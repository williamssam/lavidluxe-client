import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'

export const CheckoutNav = () => {
  const router = useRouter()

  // const tabs = [
  //   {
  //     id: 1,
  //     name: 'Information',
  //     link: '/checkout/information',
  //   },
  //   {
  //     id: 1,
  //     name: 'Information',
  //     link: '/checkout/information',
  //   },
  // ]

  return (
    <div className='text-[0.6rem] pt-1 flex items-center gap-2'>
      <p
        // href='/checkout/information'
        className={`${
          router.asPath === '/checkout/information'
            ? 'text-white font-black uppercase tracking-widest bg-main py-1 px-3 rounded'
            : 'text-gray-700 font-bold uppercase tracking-widest pl-1'
        }`}>
        Information
      </p>
      <ChevronRightIcon className='w-4 h-4' />
      <p
        className={`${
          router.asPath === '/checkout/payment'
            ? 'text-white font-black uppercase tracking-widest bg-main py-1 px-3 rounded'
            : 'text-gray-700 font-bold uppercase tracking-widest pl-1'
        }`}>
        Payment
      </p>
    </div>
  )
}
