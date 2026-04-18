import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguagesProvider } from './provider/LanguagesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguagesProvider>
      <App />
    </LanguagesProvider>
  </StrictMode>,
)
