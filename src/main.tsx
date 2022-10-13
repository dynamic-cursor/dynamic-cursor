import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { DynamicCursorProvider } from './Context'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DynamicCursorProvider menuOptions={[
      { icon: <>+</>, onClick: () => window.open("https://google.com") },
      { icon: <>-</>, onClick: () => window.open("https://youtube.com") },
      { icon: <>/</>, onClick: () => window.open("https://github.com") },
      { icon: <>:</>, onClick: () => window.open("https://facebook.com") },
    ]}>
      <App />
    </DynamicCursorProvider>
  </React.StrictMode>
)
