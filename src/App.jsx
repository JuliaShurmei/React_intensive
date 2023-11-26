import {Route, Routes} from 'react-router-dom'
import {Login} from './screens/login/Login'
import {NoteList} from './screens/privateNotes/NoteList'
import {PublicNoteList} from './screens/publicNotes/PublicNoteList'
import {useLocalization} from './contexts/LocalizationContext'
import {en} from './localization/en'
import {ru} from './localization/ru'
import './App.scss'

function App() {
  const {changeLanguage} = useLocalization()

  const handleLanguageChange = newLanguage => {
    changeLanguage(newLanguage)
  }

  return (
    <>
      <div className="language-buttons">
        <button onClick={() => handleLanguageChange(en)}>English</button>
        <button onClick={() => handleLanguageChange(ru)}>Русский</button>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/private-notes" element={<NoteList />} />
        <Route path="/public-notes" element={<PublicNoteList />} />
      </Routes>
    </>
  )
}

export default App
