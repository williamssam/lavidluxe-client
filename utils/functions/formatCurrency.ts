export const formatCurrency = (currency: number) => {
  return currency?.toLocaleString('default', {
    style: 'currency',
    currency: 'NGN',
    // maximumFractionDigits: 2,
    // minimumSignificantDigits: 5,
  })
}
