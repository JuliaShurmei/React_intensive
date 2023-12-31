import {createContext, useContext, useState} from 'react'
import {en} from './../localization/en'

const LocalizationContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useLocalization = () => {
  return useContext(LocalizationContext)
}

export const LocalizationProvider = ({children}) => {
  const [language, setLanguage] = useState(en)

  const changeLanguage = newLanguage => {
    setLanguage(newLanguage)
  }

  return (
    <LocalizationContext.Provider value={{language, changeLanguage}}>
      {children}
    </LocalizationContext.Provider>
  )
}
