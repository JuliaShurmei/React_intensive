import {useState, useEffect} from 'react'
import {useLocalization} from './../../contexts/LocalizationContext'
import {Note} from '../../components/note/Note'
import publicNotes from '../../data/publicNotes.json'
import styles from './PublicNoteList.module.scss'
import {Checkbox} from '../../components/checkbox/Checkbox'

export const PublicNoteList = () => {
  const {language} = useLocalization()
  const [favFilter, setFavFilter] = useState(() => {
    const storedFavFilter = localStorage.getItem('favFilter')
    return storedFavFilter ? JSON.parse(storedFavFilter) : false
  })
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites')
    return storedFavorites ? JSON.parse(storedFavorites) : []
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const handleAddToFavorites = noteId => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(noteId)) {
        return prevFavorites.filter(id => id !== noteId)
      } else {
        return [...prevFavorites, noteId]
      }
    })
  }

  const handleFavFilterChange = () => {
    const newFavFilter = !favFilter
    setFavFilter(newFavFilter)
    localStorage.setItem('favFilter', JSON.stringify(newFavFilter))
  }

  const filteredNotes = favFilter
    ? publicNotes.filter(note => favorites.includes(note.id))
    : publicNotes

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
