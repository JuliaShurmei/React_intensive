import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {LocalizationProvider} from './contexts/LocalizationContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LocalizationProvider>
        <App />
      </LocalizationProvider>
    </BrowserRouter>
    <div id="modal-root"></div>
  </React.StrictMode>
)
