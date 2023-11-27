import {useState} from 'react'
import styles from './EditNoteModal.module.scss'

export const EditNoteModal = ({language, note}) => {
  const [editedTitle, setEditedTitle] = useState(note.title)
  const [editedText, setEditedText] = useState(note.text)
  const [editedTag, setEditedTag] = useState(note.tags)
  const [selectedType, setSelectedType] = useState('Private')
  const [selectedColor, setSelectedColor] = useState(note?.color)

  const handleTitleChange = event => {
    setEditedTitle(event.target.value)
  }

  const handleTextChange = event => {
    setEditedText(event.target.value)
  }

  const handleTagChange = event => {
    setEditedTag(event.target.value)
  }
  const handleTypeChange = event => {
    setSelectedType(event.target.value)
  }

  const handleColorChange = e => {
    setSelectedColor(e.target.value)
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
        value={editedTitle}
        required
      />
      <label htmlFor="text">{language.description}:</label>
      <input
        className={styles.inputText}
        type="text"
        placeholder="My description"
        id="description"
        onChange={handleTextChange}
        value={editedText}
        required
      />

      <label htmlFor="tags">{language.tags}:</label>
      <input
        className={styles.inputText}
        type="text"
        id="tag"
        placeholder="[`tag`]"
        onChange={handleTagChange}
        value={editedTag}
        required
      />

      <label>{language.type}:</label>
      <select className={styles.inputText} value={selectedType} onChange={handleTypeChange}>
        <option value="Public">Public</option>
        <option value="Private">Private</option>
      </select>

      <label htmlFor="color">{language.color}:</label>
      <div style={{backgroundColor: selectedColor}}>
        <input
          style={{
            backgroundColor: selectedColor,
            border: 'none',
            display: 'flex',
            justifyContent: 'flex-start',
            cursor: 'pointer',
          }}
          placeholder={note.color}
          type="color"
          id="color"
          onChange={handleColorChange}
          value={selectedColor}
          required
        />
      </div>
    </div>
  )
}
