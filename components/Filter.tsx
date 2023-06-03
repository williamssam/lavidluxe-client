import { Category } from 'models/productModel'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import { Select } from './Select'

type FilterProps = {
  sort: string[]
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
  products: Category[] | undefined
}

export const Filter = ({
  sort,
  selected,
  setSelected,
  products,
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
