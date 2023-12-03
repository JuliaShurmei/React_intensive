import {Route, Routes} from 'react-router-dom'
import {Login} from './screens/login/Login'
import {NoteList} from './screens/privateNotes/NoteList'
import {PublicNoteList} from './screens/publicNotes/PublicNoteList'
import {DetailedNote} from './screens/detailedNote/DetailedNote'
import {ChangePassword} from './screens/changePassword/ChangePassword'
import {useLocalization} from './contexts/LocalizationContext'
import {en} from './localization/en'
import {ru} from './localization/ru'
import './App.scss'
import Header from './components/header/Header'
import Auth from './utils/auth/Auth'

function App() {
  const {changeLanguage} = useLocalization()

  const handleLanguageChange = newLanguage => {
    changeLanguage(newLanguage)
  }

  return (
    <>
      <Header />
      <div className="language-buttons">
        <button onClick={() => handleLanguageChange(en)}>English</button>
        <button onClick={() => handleLanguageChange(ru)}>Русский</button>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/private-notes"
          element={
            <Auth>
              <NoteList />
            </Auth>
          }
        />
        <Route
          path="/change-password"
          element={
            <Auth>
              <ChangePassword />
            </Auth>
          }
        />
        <Route
          path="/public-notes"
          element={
            <Auth>
              <PublicNoteList />
            </Auth>
          }
        />
        <Route
          path="/notes/:id"
          element={
            <Auth>
              <DetailedNote />
            </Auth>
          }
        />
      </Routes>
    </>
  )
}

export default App
