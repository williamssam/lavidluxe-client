export const checkDate = (date: string): boolean => {
  const today = new Date()
  const promoDate = new Date(date)

  if (today.toDateString() === promoDate.toDateString()) {
    return true
  }

  return false
}
