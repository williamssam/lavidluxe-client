type TextInputProps = {
  label: string
  type: string
  id?: string
  placeholder: string
}
export const TextInput = ({ label, type, id, placeholder }: TextInputProps) => {
  return (
    <div className='pt-5 flex flex-col'>
      <label htmlFor={id ?? label} className='capitalize text-sm'>
        {label}
      </label>
      <input
        type={type}
        name={id ?? label}
        id={id ?? label}
        className='px-3 py-3 ring-1 text-sm ring-gray-300 flex-1 focus:border-none focus:ring-2 focus:ring-blue-700 focus:outline-none mt-1 rounded text-gray-700'
        placeholder={placeholder}
      />
    </div>
  )
}
