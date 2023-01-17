import { Dispatch, SetStateAction } from 'react'
import { Select } from './Select'

type FilterProps = {
  sort: string[]
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
}

export const Filter = ({ sort, selected, setSelected }: FilterProps) => {
  // const [selected, setSelected] = useState<string | number>(sort[0])

  return (
    <section className='flex items-center justify-end pt-10 md:pt-20'>
      {/* <form>
        <label className="bg-gray-300">
          <input type="search" name="search" id="search" />
        </label>
      </form> */}

      <div className='flex items-center gap-10'>
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
