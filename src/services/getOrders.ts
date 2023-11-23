import { Order } from 'types/order'

export default async (
  startIndex = 0,
  endIndex = 50
): Promise<{ data: Order[]; lengthAll: number } | null> => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/json/orders.json`)
    if (!response.ok) {
      throw new Error(`Something went wrong! Status: ${response.status}`)
    }
    const data: Order[] = await response.json()
    // Apply pagination
    const slicedData = { data: data.slice(startIndex, endIndex), lengthAll: data?.length }

    return slicedData
  } catch (error) {
    console.error(error)
    return null
  }
}
