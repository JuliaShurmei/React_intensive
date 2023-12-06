import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useLocalization} from './../../contexts/LocalizationContext'
import {Link} from 'react-router-dom'
import {Button} from '../../components/button/Button'
import {Modal} from '../../components/modal/Modal'
import {Note} from '../../components/note/Note'
import {FiAlignJustify} from 'react-icons/fi'
import {FiEdit} from 'react-icons/fi'
import {MdDeleteOutline} from 'react-icons/md'
import mockNotes from '../../data/mockNotes.json'
import {setNotes} from '../../redux/noteSlice'
import styles from './NoteList.module.scss'
import useInput from './../../hoocs/UseInput'
import {NoteModal} from '../../components/noteModal/NoteModal'

export const NoteList = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes.notes)
  const {language} = useLocalization()
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')

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
  useEffect(() => {
    dispatch(setNotes(mockNotes))
  }, [dispatch])

  return (
    <div className={styles.noteContainer}>
      <div className={styles.cardContainer}>
        {notes.map(note => (
          <Note
            key={note.id}
            className={styles.noteCard}
            color={note.color}
            title={note?.title}
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
              onClick={() => {
                openModal(<NoteModal language={language} note={note} onClose={closeModal} />)
              }}
            />
            <Link to={`/notes/${note.id}`}>
              <Button
                className={`${styles.smallButton} ${styles.buttonTopRight}`}
                localizedValue={<FiAlignJustify />}
              />
            </Link>
          </Note>
        ))}
      </div>
      <Button
        className={styles.btnAdd}
        type="submit"
        localizedValue={language.add}
        onClick={() =>
          openModal(<NoteModal {...{language, textInput, tagsInput, colorsInput, isPublicInput}} />)
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
