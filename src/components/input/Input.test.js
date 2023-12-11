import {render, screen} from '@testing-library/react'
import {Input} from './Input'
describe('Input', () => {
  test('renders Input component with provided props', () => {
    render(
      <Input
        type="text"
        id="test-input"
        name="testField"
        className="test-class"
        placeholder="Enter text"
      />
    )

    const inputElement = screen.getByTestId('test-input')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('type', 'text')
    expect(inputElement).toHaveAttribute('id', 'test-input')
    expect(inputElement).toHaveAttribute('name', 'testField')
    expect(inputElement).toHaveAttribute('class', 'test-class')
    expect(inputElement).toHaveAttribute('placeholder', 'Enter text')
  })
})
