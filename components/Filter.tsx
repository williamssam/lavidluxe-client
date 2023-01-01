import { GridColumnThree } from 'assets/icon/GridColumnThree'
import { GridColumnTwo } from 'assets/icon/GridColumnTwo'
import { Dispatch, SetStateAction, useState } from 'react'
import { Select } from './Select'

type FilterProps = {
  setColumn: Dispatch<SetStateAction<number>>
  column: number
  sort: string[]
}

export const Filter = ({ setColumn, column, sort }: FilterProps) => {
  const [selected, setSelected] = useState<string | number>(sort[0])

  return (
    <section className='flex items-center justify-end pt-10 md:pt-20'>
      {/* <form>
        <label className="bg-gray-300">
          <input type="search" name="search" id="search" />
        </label>
      </form> */}

      <div className='flex items-center gap-10'>
        <div className='hidden items-center justify-center gap-4 text-xs tracking-[3px] sm:flex'>
          <button
            title='Three column'
            type='button'
            className={`px-2 py-[0.15rem] rounded transition-all ${
              column === 2
                ? 'bg-gray-300 text-gray-500 hover:bg-main/80 hover:text-gray-200'
                : 'bg-main text-white'
            }`}
            onClick={() => setColumn(3)}>
            <GridColumnThree />
          </button>
          <button
            title='Two column'
            type='button'
            className={`px-2 py-[0.15rem] rounded transition-all ${
              column === 3
                ? 'bg-gray-300 text-gray-400 hover:bg-main/80 hover:text-gray-200'
                : 'bg-main text-white'
            }`}
            onClick={() => setColumn(2)}>
            <GridColumnTwo />
          </button>
        </div>

        <div className='flex items-center gap-1 text-xs'>
          <h3 className='font-bold uppercase tracking-[2px] text-gray-500'>
            Sort by:
          </h3>
          <Select
            data={sort}
            selected={selected}
            setSelected={setSelected}
            className='border rounded w-44'
          />
        </div>
      </div>
    </section>
  )
}
