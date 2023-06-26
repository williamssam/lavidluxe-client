import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { ReactElement } from 'react'

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render(): ReactElement {
    return (
      <Html lang='en' className='scroll-smooth'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Vollkorn:wght@400;700&display=swap'
            rel='stylesheet'
          />
          <meta
            name='google-site-verification'
            content='3QSYIHkXtYvPv_X_06NsIvwritXnQZkTkacT5w4rCo'
          />
        </Head>
        <body className='mx-auto max-w-[115rem] bg-white font-lato text-gray-500'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
