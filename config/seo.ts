import type { DefaultSeoProps } from 'next-seo'

export const seoConfig: DefaultSeoProps = {
  title: 'Lavidluxe Clothings',
  defaultTitle: 'Lavidluxe Clothings',
  titleTemplate: '%s - Lavidluxe Clothings',
  themeColor: '#fff',
  description:
    'We are a premium Bespoke/ready to wear clothing brand that also sells handmade luxury handbags, unisex slides, and other accessories.',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: process.env.SITE_URL,
    siteName: 'Lavidluxe',
    images: [
      {
        url: '/og-image.jpg',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
    handle: '@lavidluxe',
    site: process.env.SITE_URL,
  },
  additionalLinkTags: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/ico',
      href: '/favicon.ico',
    },
    {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#333333',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
  additionalMetaTags: [
    {
      name: 'msapplication-TileColor',
      content: '#333333',
    },
    {
      name: 'google-site-verification',
      content: '3QSYIHkXtYvPv_x_06NslvwrRitXnQZkTkacT5w4rCo',
    },
  ],
}
