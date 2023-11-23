import {Note} from '../../components/note/Note'
import publicNotes from '../../data/publicNotes.json'
import styles from './PublicNoteList.module.scss'

export const PublicNoteList = () => {
  return (
    <>
      <div className={styles.cardContainer}>
        {publicNotes.map(note => (
          <Note
            key={note.id}
            className={styles.noteCard}
            color={note.color}
            title={note.title}
            text={note.text}
            tags={note.tags}
            isPublic={note.isPublic}
            owner={note.owner}
            onAddToFavorites={() => {
              console.log(`Added to favorites: ${note.title}`)
            }}
          />
        ))}
      </div>
    </>
  )
}
