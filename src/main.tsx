import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { DynamicCursorProvider } from './Context'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DynamicCursorProvider menuOptions={[
      { icon: <>+</>, onClick: () => console.log("clicked") },
      { icon: <>+</>, onClick: () => console.log("clicked1") },
      { icon: <>+</>, onClick: () => console.log("clicked3") },
      { icon: <>+</>, onClick: () => console.log("clicked4") },
    ]}>
      <App />
    </DynamicCursorProvider>
  </React.StrictMode>
)
