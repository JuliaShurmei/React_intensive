import {useEffect} from 'react'
import {useLocalization} from './../../contexts/LocalizationContext'
import {useDispatch, useSelector} from 'react-redux'
import {toggleFavFilter, addToFavorites} from '../../redux/publicNotesSlice'
import {setNotes} from '../../redux/publicNotesSlice'
import {Note} from '../../components/note/Note'
import publicNotes from '../../data/publicNotes.json'
import styles from './PublicNoteList.module.scss'
import {Checkbox} from '../../components/checkbox/Checkbox'

export const PublicNoteList = () => {
  const dispatch = useDispatch()
  const {language} = useLocalization()
  const {favFilter, favorites, notes} = useSelector(state => state.publicNotes)

  const handleAddToFavorites = noteId => {
    dispatch(addToFavorites(noteId))
  }

  const handleFavFilterChange = () => {
    dispatch(toggleFavFilter())
  }

  useEffect(() => {
    dispatch(setNotes(publicNotes))
  }, [dispatch])

  const filteredNotes = favFilter ? notes.filter(note => favorites[note.id]) : notes

  return (
    <>
      <Checkbox
        type="checkbox"
        label={language.showFavorites}
        value={favFilter}
        onChange={handleFavFilterChange}
      />
      <div className={styles.cardContainer}>
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <Note
              key={note.id}
              className={styles.noteCard}
              color={note.color}
              title={note.title}
              text={note.text}
              tags={note.tags}
              isPublic={note.isPublic}
              owner={note.owner}
              onAddToFavorites={() => handleAddToFavorites(note.id)}
            />
          ))
        ) : (
          <p>{language.noFavorites}</p>
        )}
      </div>
    </>
  )
}
