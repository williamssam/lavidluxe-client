export const getPercentageDecrease = (numA: number, numB: number) => {
  const percentage = ((numA - numB) / numB) * 100
  return Math.round(percentage)
}
