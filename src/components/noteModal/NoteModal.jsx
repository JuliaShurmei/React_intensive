import {useState, useEffect} from 'react'
import styles from './NoteModal.module.scss'

export const NoteModal = ({language, note}) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [tags, setTags] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [color, setColor] = useState('#B0B0B0')

  useEffect(() => {
    if (note) {
      setTitle(note.title || '')
      setText(note.text || '')
      setTags(note.tags || '')
      setIsPublic(note.isPublic || false)
      setColor(note.color || '#B0B0B0')
    }
  }, [note])

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleTextChange = event => {
    setText(event.target.value)
  }

  const handleTagsChange = event => {
    setTags(event.target.value)
  }

  const handleIsPublicChange = event => {
    setIsPublic(event.target.value === 'Public')
  }

  const handleColorChange = event => {
    setColor(event.target.value)
  }

  return (
    <div className={styles.modal}>
      <label htmlFor="title">{language.title}:</label>
      <input
        className={styles.inputText}
        placeholder="My title"
        type="text"
        id="title"
        onChange={handleTitleChange}
        value={title}
        required
      />
      <label htmlFor="text">{language.description}:</label>
      <input
        className={styles.inputText}
        type="text"
        placeholder="My description"
        id="description"
        onChange={handleTextChange}
        value={text}
        required
      />

      <label htmlFor="tags">{language.tags}:</label>
      <input
        className={styles.inputText}
        type="text"
        id="tag"
        placeholder="[`tag`]"
        onChange={handleTagsChange}
        value={tags}
        required
      />

      <label>{language.type}:</label>
      <select
        className={styles.inputText}
        onChange={handleIsPublicChange}
        value={isPublic ? 'Public' : 'Private'}>
        <option>Public</option>
        <option>Private</option>
      </select>

      <label htmlFor="color">{language.color}:</label>
      <div style={{backgroundColor: color}}>
        <input
          className={styles.inputColor}
          placeholder="#B0B0B0"
          type="color"
          id="color"
          onChange={handleColorChange}
          value={color}
          required
        />
      </div>
    </div>
  )
}
