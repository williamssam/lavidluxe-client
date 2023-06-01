type ErrorFallbackProps = {
  error: Error
  resetErrorBoundary: () => void
}

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) => {
  return (
    <section className='flex min-h-screen flex-col items-center justify-center'>
      <div
        role='alert'
        className='rounded bg-red-100 py-8 px-2 text-center md:px-14'>
        <h2 className='font-vollkorn text-2xl font-bold text-red-600 md:text-4xl'>
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
          className='mt-10 rounded bg-red-600 py-3 px-8 text-xs font-bold uppercase tracking-[3px] text-white transition-transform active:scale-[0.98]'>
          Try again
        </button>
      </div>
    </section>
  )
}
