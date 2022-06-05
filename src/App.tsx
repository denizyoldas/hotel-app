import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Detail from './pages/detail'
import Main from './pages/main'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/detail/:id" element={<Detail />} />
    </Routes>
  )
}

export default App
