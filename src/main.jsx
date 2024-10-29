import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import EventosNoticias from './EventosNoticias.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EventosNoticias />
  </StrictMode>,
)
