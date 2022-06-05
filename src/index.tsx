import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './global.css'
import AppProvider from './store/app-provider'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <AppProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AppProvider>
  </BrowserRouter>
)
