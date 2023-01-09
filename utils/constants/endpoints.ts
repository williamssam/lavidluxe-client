export const serverUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_SERVER_URL
    : process.env.PROD_SERVER_URL
