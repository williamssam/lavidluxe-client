// The flat rate of VAT in Nigeria is 5%
const vatPercent = 3

export const calculateVAT = (amount: number) => {
  const percent = vatPercent / 100
  return percent * amount
}
