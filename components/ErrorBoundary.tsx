import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
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
            <p></p>
            <button
              type='button'
              className='mt-10 py-3 px-8 bg-red-600 text-white uppercase font-bold tracking-[3px] rounded text-xs transition-transform active:scale-95'
              onClick={() => this.setState({ hasError: false })}>
              Try again?
            </button>
          </div>
        </section>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
