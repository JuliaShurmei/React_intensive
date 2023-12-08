import {useState, useEffect, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useLocalization} from './../../contexts/LocalizationContext'
import {Button} from '../../components/button/Button'
import {Link} from 'react-router-dom'
import {Modal} from '../../components/modal/Modal'
import {Note} from '../../components/note/Note'
import {FiAlignJustify, FiEdit} from 'react-icons/fi'
import {MdDeleteOutline} from 'react-icons/md'
import styles from './NoteList.module.scss'
import {getPersonalNotes} from '../../redux/middleware/personalNotesThunk'
import {NoteModal} from '../../components/noteModal/NoteModal'
import {addNote} from '../../redux/middleware/addNoteThunk'
import {deleteNote} from '../../redux/middleware/deleteNoteThunk'
import {updateNote} from '../../redux/middleware/editNoteThunk'
import {detailedNote} from '../../redux/middleware/detailedNoteThunk'

export const NoteList = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes.notes)
  const {language} = useLocalization()
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const [deleteNoteId, setDeleteNoteId] = useState(null)
  const [updateNoteId, setUpdateNoteId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleConfirmClick = useCallback(
    async noteData => {
      try {
        await dispatch(addNote(noteData))
        closeModal()
      } catch (error) {
        console.error('Error adding note:', error)
      }
    },
    [dispatch]
  )

  const handleEditClick = useCallback(
    async noteData => {
      try {
        await dispatch(updateNote({noteId: updateNoteId, updatedData: noteData}))
        closeModal()
        await dispatch(getPersonalNotes())
      } catch (error) {
        console.error('Error updating note:', error)
      }
    },
    [dispatch, updateNoteId]
  )

  const handleConfirmDelete = useCallback(async () => {
    try {
      await dispatch(deleteNote(deleteNoteId))
      closeModal()
      await dispatch(getPersonalNotes())
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }, [dispatch, deleteNoteId])

  const openModal = (content, noteId) => {
    setModalOpen(true)
    setModalContent(content)
    setUpdateNoteId(noteId)
  }

  const closeModal = () => {
    setModalOpen(false)
    setModalContent('')
    setDeleteNoteId(null)
    setUpdateNoteId(null)
  }

  useEffect(() => {
    const fetchPersonalNotes = async () => {
      try {
        await dispatch(getPersonalNotes())
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching personal notes:', error)
        setError(error)
        setIsLoading(false)
      }
    }

    fetchPersonalNotes()
  }, [dispatch])

  return (
    <div className={styles.noteContainer}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && !error && (
        <>
          <div className={styles.cardContainer}>
            {notes.length === 0 ? (
              <p>No personal notes available.</p>
            ) : (
              notes.map(note => (
                <div key={note.id}>
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
                      onClick={() => {
                        setDeleteNoteId(note.id)
                        openModal(language.deleteConfirmation)
                      }}
                    />
                    <Button
                      className={`${styles.smallButton} ${styles.buttonBottomRight}`}
                      localizedValue={<FiEdit />}
                      onClick={() => {
                        setUpdateNoteId(note.id)
                        openModal(
                          <NoteModal
                            language={language}
                            note={note}
                            onConfirm={handleEditClick}
                            onClose={closeModal}
                          />
                        )
                      }}
                    />
                    <Link to={`/notes/${note.id}`}>
                      <Button
                        className={`${styles.smallButton} ${styles.buttonTopRight}`}
                        localizedValue={<FiAlignJustify />}
                        onClick={() => {
                          dispatch(detailedNote(note.id))
                        }}
                      />
                    </Link>
                  </Note>
                </div>
              ))
            )}
            <Button
              className={styles.btnAdd}
              type="submit"
              localizedValue={language.add}
              onClick={() => {
                openModal(
                  <NoteModal {...{language}} onConfirm={handleConfirmClick} onClose={closeModal} />
                )
              }}
            />
          </div>
          {isModalOpen && (
            <Modal>
              <div className="modal-content">{modalContent}</div>
              {deleteNoteId && (
                <div className={styles.buttonContainer}>
                  <Button
                    className={styles.btnModal}
                    onClick={closeModal}
                    localizedValue={language.cancel}
                  />
                  <Button
                    className={styles.btnModal}
                    localizedValue={language.confirm}
                    onClick={handleConfirmDelete}
                  />
                </div>
              )}
            </Modal>
          )}
        </>
      )}
    </div>
  )
}
