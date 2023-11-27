import {useParams} from 'react-router-dom'
import mockNotes from './../../data/mockNotes.json'
import {IoMdArrowBack} from 'react-icons/io'
import {useLocalization} from './../../contexts/LocalizationContext'
import {useNavigate} from 'react-router-dom'
import styles from './DetailedNote.module.scss'

export const DetailedNote = () => {
  const navigate = useNavigate()

  const {id} = useParams()
  const {language} = useLocalization()
  const detailedNote = mockNotes.find(item => item.id.toString() === id)

  if (!detailedNote) {
    return <div>Note not found</div>
  }

  return (
    <div className={styles.noteContainer}>
      <div className={styles.noteCard} style={{backgroundColor: detailedNote.color}}>
        <h3>
          {language.title}: {detailedNote.title}
        </h3>
        <p>
          {language.description} : {detailedNote.text}
        </p>
        <p>
          {language.tags} :{detailedNote.tags}
        </p>
        <IoMdArrowBack className={styles.backIcon} onClick={() => navigate(-1)} />
      </div>
    </div>
  )
}
