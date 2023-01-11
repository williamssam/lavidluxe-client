# **Lavidluxe**

A premium Bespoke/ready to wear clothing brand that also sells handmade luxury handbags, unisex slides, and other accessories.

## Table Of Contents (TOC)

- [Installation](#Installation)
- [Features](#Features)
- [Issues](#Issues)
- [Troubleshooting](#Troubleshooting)
- [TODO](#TODO)

## Installation

1.  Install and activate the following required plugins, in your WordPress plugin directory:

- [woocommerce](https://wordpress.org/plugins/woocommerce) Ecommerce for WordPress.
- [wp-graphql](https://wordpress.org/plugins/wp-graphql) Exposes GraphQL for WordPress.
- [wp-graphql-woocommerce](https://github.com/wp-graphql/wp-graphql-woocommerce) Adds WooCommerce functionality to a WPGraphQL schema.

Optional plugin:

- [headless-wordpress](https://github.com/w3bdesign/headless-wp) Disables the frontend so only the backend is accessible. (optional)

2.  For debugging and testing, install either:

    <https://addons.mozilla.org/en-US/firefox/addon/apollo-developer-tools/> (Firefox)

    <https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm> (Chrome)

3.  Make sure WooCommerce has some products already or import some sample products

    The WooCommerce sample products CSV file is available at `wp-content/plugins/woocommerce/sample-data/sample_products.csv` or [Sample products](sample_products/)

    Import the products at `WP Dashboard > Tools > Import > WooCommerce products(CSV)`

4.  Clone or fork the repo and modify `.env.example` and rename it to `.env`

    Then set the environment variables accordingly in Vercel or your preferred hosting solution.

    See <https://vercel.com/docs/environment-variables>

5.  Modify the values according to your setup

6.  Start the server with `npm run dev`

7.  Enable COD (Cash On Demand) payment method in WooCommerce

8.  Add a product to the cart

9.  Proceed to checkout (Gå til kasse)

10. Fill in your details and place the order

## Features

- Next.js
- React 18
- Connect to Woocommerce GraphQL API and list name, price and display image for products
- Cart handling and checkout
- Meets WCAG accessibility standards where possible
- Apollo Client with GraphQL
- React Hook Form with form validation and error display
- Animations with @formkit/auto-animate
- Shows page load progress with Nprogress during navigation
- Fully responsive design
- Product listings
- Pretty URLs with builtin Nextjs functionality
- Tailwind for styling
- JSDoc comments

## Troubleshooting

### I am getting a cart undefined error or other GraphQL errors

Check that you are using the 0.6.2 version of the [wp-graphql-woocommerce](https://github.com/wp-graphql/wp-graphql-woocommerce) plugin

### The products page isn't loading

Check the attributes of the products. Right now the application requires Size and Color.

## Issues

Overall the application is working as intended, but it has not been tested extensively in a production environment.
More testing and debugging is required before deploying it in a production environment.

With that said, keep the following in mind:

- Currently only simple products and variable products work without any issues. Other product types are not known to work.
- Only Cash On Delivery (COD) is currently supported. More payment methods may be added later.

## TODO

- Add total to cart/checkout page
- Show stock quantity on individual products
- Copy billing address to shipping address
- Display product variation name in cart / checkout
- Hide products not in stock
- Add better SEO
- Re-add Next/image when it is working better
