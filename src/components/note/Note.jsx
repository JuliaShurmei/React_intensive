import {useState, useEffect} from 'react'
import {useLocalization} from './../../contexts/LocalizationContext'
import {Button} from '../../components/button/Button'
import {FaHeart} from 'react-icons/fa'
import styles from './Note.module.scss'

export const Note = ({
  color,
  title,
  text,
  tags,
  isPublic,
  owner,
  children,
  className,
  onAddToFavorites,
}) => {
  const {language} = useLocalization()
  const truncatedText = text.length > 100 ? `${text.substring(0, 50)}...` : text
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const storedFavorite = localStorage.getItem(`favorite_${title}`)
    setIsFavorite(storedFavorite === 'true')
  }, [title])

  const handleAddToFavorites = () => {
    const newFavoriteState = !isFavorite
    setIsFavorite(newFavoriteState)
    localStorage.setItem(`favorite_${title}`, newFavoriteState.toString())
    onAddToFavorites()
  }

  return (
    <>
      <div className={className} style={{backgroundColor: color}}>
        <h3>
          {language.title} : {title}
        </h3>
        <p>
          {language.description} : {truncatedText}
        </p>
        <p>
          {language.tags} : {tags.join(', ')}
        </p>
        <p>
          {language.type} : {isPublic ? 'Public' : 'Private'}
        </p>
        <p>
          {language.owner} : {owner}
        </p>
        {isPublic ? (
          <Button
            className={`${styles.smallButton} ${styles.buttonBottomRight}`}
            localizedValue={<FaHeart color={isFavorite ? 'red' : 'white'} />}
            onClick={handleAddToFavorites}
          />
        ) : (
          children
        )}
      </div>
    </>
  )
}
