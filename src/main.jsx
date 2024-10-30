import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './home.jsx'
import NavBar from './NavBar.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <NavBar />
    <Home />
  </StrictMode>,
)
