import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid'
import { PageInfo } from 'models/productsModel'

type PaginationProps = {
  pageInfo: PageInfo
}

export const Pagination = ({ pageInfo }: PaginationProps) => {
  // const pages = [1, 2, 3, 4, 5];
  return (
    <div className='flex flex-col items-center justify-center mt-10'>
      {/* <p className='text-xs'>
        Showing <span className='font-black text-[#333333]'>1</span> to{' '}
        <span className='font-black text-[#333333]'>12</span> of{' '}
        <span className='font-black text-[#333333]'>100</span> Entries
      </p> */}

      <div className='flex items-center gap-4 pt-2'>
        <button
          disabled={!pageInfo.hasPreviousPage}
          className='flex items-center gap-2 bg-[#333333] font-bold text-gray-100 py-2 px-4 rounded text-xs uppercase tracking-[3px] active:scale-95 transition-all hover:bg-main disabled:bg-gray-300 disabled:active:scale-100 disabled:cursor-not-allowed'>
          <ArrowLongLeftIcon className='w-4 h-4' />
          <span>Prev</span>
        </button>
        <button
          disabled={!pageInfo.hasNextPage}
          className='flex items-center gap-2 bg-[#333333] font-bold text-gray-100 py-2 px-4 rounded text-xs uppercase tracking-[3px] active:scale-95 transition-all hover:bg-main disabled:bg-gray-300 disabled:active:scale-100 disabled:cursor-not-allowed'>
          <span>Next</span>
          <ArrowLongRightIcon className='w-4 h-4' />
        </button>
      </div>
    </div>
  )
}
