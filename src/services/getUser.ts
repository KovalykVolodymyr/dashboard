import { User } from 'types/user'

export default async (email: string): Promise<User | null> => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/json/users.json`)
    if (!response.ok) {
      throw new Error(`Something went wrong! Status: ${response.status}`)
    }
    const data: User[] = await response.json()
    return data.find(user => user.email === email) || null
  } catch (error) {
    console.error(error)
    return null
  }
}
