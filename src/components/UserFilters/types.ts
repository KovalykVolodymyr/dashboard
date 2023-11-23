import { User } from 'types/user'

export interface Props {
  users: User[]
  filter: (filteredUsers: User[]) => void
}

export interface Filter {
  key: keyof User
  header: string
  options: string[]
}
