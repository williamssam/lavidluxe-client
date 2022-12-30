type ErrorFallbackProps = {
  error: Error
  resetErrorBoundary: () => void
}

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) => {
  return (
    <section className='flex flex-col items-center justify-center min-h-screen'>
      <div
        role='alert'
        className='text-center bg-red-100 py-8 px-2 md:px-14 rounded'>
        <h2 className='text-red-600 font-vollkorn font-bold text-2xl md:text-4xl'>
          Oops 😔, Something went wrong
        </h2>
        <p className='text-gray-600'>
          Our engineers are working on resolving it.
        </p>
        {/* <button
          type='button'

          onClick={() => this.setState({ hasError: false })}>
          Try again?
        </button> */}
        <button
          onClick={resetErrorBoundary}
          className='mt-10 py-3 px-8 bg-red-600 text-white uppercase font-bold tracking-[3px] rounded text-xs transition-transform active:scale-95'>
          Try again
        </button>
      </div>
    </section>
  )
}
