import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid'
import { client } from 'utils/sanity/client'
import { moreData } from 'utils/sanity/groqQuerries'

export const Pagination = () => {
  let lastId = ''
  const nextPage = async () => {
    if (lastId === null) {
      return []
    }
    const { result } = await client.fetch(moreData, { lastId })

    if (result.length > 0) {
      lastId = result[result.length - 1]._id
    } else {
      lastId = ''
    }
    return result
  }

  return (
    <div className='mt-10 flex flex-col items-center justify-center'>
      {/* <p className='text-xs'>
        Showing <span className='font-black text-[#333333]'>1</span> to{' '}
        <span className='font-black text-[#333333]'>12</span> of{' '}
        <span className='font-black text-[#333333]'>100</span> Entries
      </p> */}

      <div className='flex items-center gap-4 pt-2'>
        <button className='flex items-center gap-2 rounded bg-[#333333] py-2 px-4 text-xs font-bold uppercase tracking-[3px] text-gray-100 transition-all hover:bg-main active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:active:scale-100'>
          <ArrowLongLeftIcon className='h-4 w-4' />
          <span>Prev</span>
        </button>
        <button className='flex items-center gap-2 rounded bg-[#333333] py-2 px-4 text-xs font-bold uppercase tracking-[3px] text-gray-100 transition-all hover:bg-main active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:active:scale-100'>
          <span>Next</span>
          <ArrowLongRightIcon className='h-4 w-4' />
        </button>
      </div>
    </div>
  )
}
