type TextInputProps = {
  label: string
  type: string
  id?: string
  placeholder: string
}
export const TextInput = ({ label, type, id, placeholder }: TextInputProps) => {
  return (
    <div className='pt-4 flex flex-col w-full'>
      <label htmlFor={id ?? label} className='capitalize text-sm'>
        {label}
      </label>
      <input
        type={type}
        name={id ?? label}
        id={id ?? label}
        className='px-3 py-3 ring-1 rounded text-sm ring-gray-300 focus:border-none focus:ring-2 focus:ring-main focus:outline-none mt-1 text-gray-700 w-full flex-1'
        placeholder={placeholder}
      />
    </div>
  )
}
