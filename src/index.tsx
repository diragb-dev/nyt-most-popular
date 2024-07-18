// Packages:
import React from 'react'
import ReactDOM from 'react-dom/client'

// Imports:
import './index.css'

// Context:
import { NYTArticlesProvider } from './context/NYTArticlesContext'


// Components:
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <NYTArticlesProvider>
      <App />
    </NYTArticlesProvider>
  </React.StrictMode>,
)
