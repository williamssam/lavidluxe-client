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
          {/* google fonts */}
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

          {/* favicons */}
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link rel='icon' type='image/ico' href='/favicon.ico' />
          <link rel='manifest' href='/site.webmanifest' />
          <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#333333' />
          <meta name='msapplication-TileColor' content='#333333' />
          <meta name='theme-color' content='#ffffff' />

          <meta property='og:image' content='/og-image.jpg' />
          <meta property='og:image:width' content='279' />
          <meta property='og:image:height' content='279' />
          <meta property='og:title' content='Lavidluxe' />
          <meta
            property='og:description'
            content='We are a premium Bespoke/ready to wear clothing brand that also sells handmade luxury handbags, unisex slides, and other accessories.'
          />
          <meta property='og:url' content='https://lavidluxe.com'></meta>
        </Head>
        <body className='bg-white font-lato text-gray-500 max-w-[115rem] mx-auto'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
