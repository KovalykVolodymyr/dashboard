export const getUserId = (email: string): string => {
  const encoded = btoa(email)
  return encoded
}

export const getUserEmailFromId = (userId: string): string => {
  const decoded = atob(userId)
  return decoded
}

export const timestampToDateTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)

  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`.slice(-2) // Months are 0-based in JS
  const day = `0${date.getDate()}`.slice(-2)
  const hours = `0${date.getHours()}`.slice(-2)
  const minutes = `0${date.getMinutes()}`.slice(-2)

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

export const formatCurrency = (amount: number, currency?: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD'
  }).format(amount)
}
