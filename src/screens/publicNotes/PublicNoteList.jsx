import {useState} from 'react'
import {Note} from '../../components/note/Note'
import publicNotes from '../../data/publicNotes.json'
import styles from './PublicNoteList.module.scss'
import {Checkbox} from '../../components/checkbox/Checkbox'

export const PublicNoteList = () => {
  const [favFilter, setFavFilter] = useState(false)
  const [favorites, setFavorites] = useState([])

  const handleAddToFavorites = noteId => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(noteId)) {
        return prevFavorites.filter(id => id !== noteId)
      } else {
        return [...prevFavorites, noteId]
      }
    })
  }

  const filteredNotes = favFilter
    ? publicNotes.filter(note => favorites.includes(note.id))
    : publicNotes

  return (
    <>
      <Checkbox
        type="checkbox"
        label="Show only favorites"
        value={favFilter}
        onChange={() => setFavFilter(v => !v)}
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
          <p>No notes added to favorites yet.</p>
        )}
      </div>
    </>
  )
}
