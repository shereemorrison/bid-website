import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
/**
 * Register GSAP plugins once before React hydrates so ScrollTrigger is globally available.
 * Vite tree-shakes unused GSAP exports; we only pay for what timelines import.
 */
import './animations/registerGsap'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
