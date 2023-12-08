import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useCallback} from 'react'
import {IoMdArrowBack} from 'react-icons/io'
import {useLocalization} from './../../contexts/LocalizationContext'
import {useNavigate} from 'react-router-dom'
import {detailedNote} from '../../redux/middleware/detailedNoteThunk'
import styles from './DetailedNote.module.scss'

export const DetailedNote = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {id} = useParams()
  const {language} = useLocalization()

  const detailedNoteData = useSelector(state => state.notes.detailedNote)

  const handleNavigateBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  useEffect(() => {
    if (id) {
      dispatch(detailedNote(id))
    }
  }, [id, dispatch])

  if (!detailedNoteData) {
    return <div className={styles.noteCard}>Loading</div>
  }
  const {title, text, tags, isPublic, owner, color} = detailedNoteData.detailedNote

  return (
    <div className={styles.noteContainer}>
      <div className={styles.noteCard} style={{backgroundColor: color}}>
        <h3>
          {language.title}: {title}
        </h3>
        <p>
          {language.description} : {text}
        </p>
        <p>
          {language.tags} : {tags}
        </p>
        <p>
          {language.type} : {isPublic ? 'Public' : 'Private'}
        </p>
        <p>
          {language.owner} : {owner}
        </p>
        <IoMdArrowBack className={styles.backIcon} onClick={handleNavigateBack} />
      </div>
    </div>
  )
}
