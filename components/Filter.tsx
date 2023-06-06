import { RadioGroup } from '@headlessui/react'
import { FourGrid } from 'assets/icon/FourGrid'
import { ThreeGrid } from 'assets/icon/ThreeGrid'
import { TwoGrid } from 'assets/icon/TwoGrid'
import { Category } from 'models/productModel'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import { Select } from './Select'

type FilterProps = {
  sort: string[]
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
  products: Category[] | undefined
  grid: number | null
  setGrid: Dispatch<SetStateAction<number | null>>
}
const grids = [
  {
    value: 2,
    icon: <TwoGrid />,
  },
  {
    value: 3,
    icon: <ThreeGrid />,
  },
  {
    value: 4,
    icon: <FourGrid />,
  },
]

export const Filter = ({
  sort,
  selected,
  setSelected,
  products,
  grid,
  setGrid,
}: FilterProps) => {
  const router = useRouter()
  const { slug } = router.query
  const categories = products?.find(category => category.slug.current === slug)

  return (
    <section className='flex flex-wrap items-center justify-center gap-1 pt-10 md:justify-between md:pt-20'>
      <p className='text-xs'>
        There are {categories?.products?.length ?? 0} product(s) in this
        category.
      </p>

      <RadioGroup
        value={grid}
        onChange={(value: SetStateAction<number | null>) => {
          setGrid(value)
          localStorage.setItem('lavidluxeGrid', JSON.stringify(value))
        }}
        className='hidden lg:flex lg:items-center lg:gap-2'>
        {grids.map(grid => (
          <RadioGroup.Option
            value={grid.value}
            key={grid.value}
            className='flex cursor-pointer'>
            {({ checked }) => (
              <span
                className={`${
                  checked
                    ? 'bg-gray-600 text-white'
                    : 'text-current hover:bg-gray-100'
                } grid place-items-center rounded px-2 text-xs transition-colors ${
                  grid.value === 4 ? 'py-2' : 'py-[2px]'
                }`}>
                {grid.icon}
              </span>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>

      <div className='flex items-center gap-1 text-xs'>
        <h3 className='font-bold uppercase tracking-[2px] text-gray-500'>
          Sort by:
        </h3>
        <Select
          data={sort}
          selected={selected}
          setSelected={setSelected}
          className='w-44 rounded border !normal-case'
        />
      </div>
    </section>
  )
}
