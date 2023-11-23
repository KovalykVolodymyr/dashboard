export interface Props {
  headers: string[]
  rows: Row[]
}

export interface Row {
  columns: Column[]
  callback?: () => void | null
}

export interface Column {
  key: string
  value: string
}
