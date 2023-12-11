import {render} from '@testing-library/react'
import {Modal} from './Modal'

jest.mock('react-dom', () => ({
  createPortal: node => node,
}))

describe('Modal', () => {
  test('renders Modal component with children', () => {
    const {getByTestId} = render(
      <Modal>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    )

    const modalContent = getByTestId('modal-content')
    expect(modalContent).toBeInTheDocument()
  })
})
