import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import app from './app/App.jsx'
import App from './app/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
