import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResponsiveTable from 'components/ResponsiveTable'

// Mock data for testing
const mockHeaders = ['Avatar', 'Name', 'Email']
const mockRows = [
  {
    columns: [
      { key: 'avatar', value: 'avatar-url' },
      { key: 'name', value: 'John Doe' },
      { key: 'email', value: 'john@example.com' }
    ],
    callback: jest.fn()
  }
  // Add more rows as needed
]

describe('ResponsiveTable component', () => {
  it('renders table with headers and rows', () => {
    render(<ResponsiveTable headers={mockHeaders} rows={mockRows} />)

    // Check if headers are rendered
    mockHeaders.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument()
    })

    // Check if rows are rendered
    mockRows.forEach(({ columns }) => {
      columns.forEach(({ value }) => {
        expect(screen.getByText(value)).toBeInTheDocument()
      })
    })
  })

  it('calls callback on row click', () => {
    render(<ResponsiveTable headers={mockHeaders} rows={mockRows} />)

    // Trigger click on a row
    userEvent.click(screen.getByText('John Doe'))

    // Check if the callback is called
    expect(mockRows[0].callback).toHaveBeenCalledTimes(1)
  })
})
