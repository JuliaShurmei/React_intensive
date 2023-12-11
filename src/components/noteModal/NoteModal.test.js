import React from 'react'
import '@testing-library/jest-dom'
import {render, screen, fireEvent} from '@testing-library/react'
import {NoteModal} from './NoteModal'

const mockOnConfirm = jest.fn()
const mockOnClose = jest.fn()

const language = {
  title: 'Title',
  description: 'Description',
  tags: 'Tags',
  type: 'Type',
  color: 'Color',
  confirm: 'Confirm',
  cancel: 'Cancel',
}

const mockNote = {
  title: 'Test Title',
  text: 'Test Description',
  tags: ['tag1', 'tag2'],
  isPublic: true,
  color: '#FFFFFF',
}

describe('NoteModal', () => {
  test('renders NoteModal with default values', () => {
    render(<NoteModal language={language} onClose={mockOnClose} />)

    expect(screen.getByLabelText('Title:').getAttribute('placeholder')).toBe('My title')
  })

  test('renders NoteModal with provided note values', () => {
    render(<NoteModal language={language} note={mockNote} onClose={mockOnClose} />)

    expect(screen.getByLabelText('Title:')).toHaveValue('Test Title')
  })

  test('calls onConfirm with correct note data', () => {
    render(
      <NoteModal
        language={language}
        note={mockNote}
        onConfirm={mockOnConfirm}
        onClose={mockOnClose}
      />
    )

    fireEvent.change(screen.getByLabelText('Title:'), {target: {value: 'New Title'}})
    fireEvent.click(screen.getByText('Confirm'))

    expect(mockOnConfirm).toHaveBeenCalledWith({
      title: 'New Title',
      text: 'Test Description',
      tags: ['tag1', 'tag2'],
      isPublic: true,
      color: '#FFFFFF',
    })
  })

  test('calls onClose when Cancel button is clicked', () => {
    render(<NoteModal language={language} onClose={mockOnClose} />)

    fireEvent.click(screen.getByText('Cancel'))
    expect(mockOnClose).toHaveBeenCalled()
  })
})
