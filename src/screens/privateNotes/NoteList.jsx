import {useState} from 'react'
import {useLocalization} from './../../contexts/LocalizationContext'
import {Button} from '../../components/button/Button'
import {Modal} from '../../components/modal/Modal'
import {Note} from '../../components/note/Note'
import {FiAlignJustify} from 'react-icons/fi'
import {FiEdit} from 'react-icons/fi'
import {MdDeleteOutline} from 'react-icons/md'
import mockNotes from '../../data/mockNotes.json'
import styles from './NoteList.module.scss'
import useInput from './../../hoocs/UseInput'

export const NoteList = () => {
  const {language} = useLocalization()
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')

  const titleInput = useInput('')
  const textInput = useInput('')
  const tagsInput = useInput('')
  const colorsInput = useInput('')
  const isPublicInput = useInput(true)

  const openModal = content => {
    setModalOpen(true)
    setModalContent(content)
  }

  const closeModal = () => {
    setModalOpen(false)
    setModalContent('')
  }

  return (
    <div className={styles.noteContainer}>
      <div className={styles.cardContainer}>
        {mockNotes.map(note => (
          <Note
            key={note.id}
            className={styles.noteCard}
            color={note.color}
            title={note.title}
            text={note.text}
            tags={note.tags}
            isPublic={note.isPublic}
            owner={note.owner}>
            <Button
              className={`${styles.smallButton} ${styles.buttonBottomLeft}`}
              localizedValue={<MdDeleteOutline />}
              onClick={() => openModal(language.deleteConfirmation)}
            />
            <Button
              className={`${styles.smallButton} ${styles.buttonBottomRight}`}
              localizedValue={<FiEdit />}
            />
            <Button
              className={`${styles.smallButton} ${styles.buttonTopRight}`}
              localizedValue={<FiAlignJustify />}
            />
          </Note>
        ))}
      </div>
      <Button
        className={styles.btnAdd}
        type="submit"
        localizedValue={language.add}
        onClick={() =>
          openModal(
            <div className={styles.modal}>
              <label htmlFor="title">{language.title}:</label>
              <input
                className={styles.inputText}
                placeholder="My title"
                type="text"
                id="title"
                onChange={titleInput.onChange}
                required
              />
              <label htmlFor="text">{language.description}:</label>
              <input
                className={styles.inputText}
                type="text"
                placeholder="My description"
                id="description"
                onChange={textInput.onChange}
                required
              />

              <label htmlFor="tags">{language.tags}:</label>
              <input
                className={styles.inputText}
                type="text"
                id="tag"
                placeholder="[`tag`]"
                onChange={tagsInput.onChange}
                required
              />

              <label>{language.type}:</label>
              <select className={styles.inputText} onChange={isPublicInput.onChange}>
                <option> Public</option>
                <option> Private</option>
              </select>

              <label htmlFor="tags">{language.color}:</label>
              <input
                className={styles.inputText}
                placeholder="#B0B0B0"
                type="text"
                id="color"
                onChange={colorsInput.onChange}
                required
              />
            </div>
          )
        }
      />
      {isModalOpen && (
        <Modal>
          <div className="modal-content">{modalContent}</div>
          <div className={styles.buttonContainer}>
            <Button
              className={styles.btnModal}
              onClick={closeModal}
              localizedValue={language.cancel}
            />
            <Button className={styles.btnModal} localizedValue={language.confirm} />
          </div>
        </Modal>
      )}
    </div>
  )
}
