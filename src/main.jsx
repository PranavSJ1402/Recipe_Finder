import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";  // This should be the path to the file where Tailwind is imported
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
