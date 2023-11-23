/* eslint-disable no-console */
import { User } from 'types/user'

export default async (
  startIndex = 0,
  endIndex = 50
): Promise<{ data: User[]; lengthAll: number } | null> => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/json/users.json`)
    if (!response.ok) {
      throw new Error(`Something went wrong! Status: ${response.status}`)
    }
    const data: User[] = await response.json()

    // Apply pagination
    const slicedData = { data: data.slice(startIndex, endIndex), lengthAll: data?.length }

    return slicedData
  } catch (error) {
    console.error(error)
    return null
  }
}
