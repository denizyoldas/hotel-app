import React from 'react'
import CardList from './components/card-list'
import Header from './components/header'
import { Plus } from 'phosphor-react'

function App() {
  return (
    <div className="p-4">
      <Header />
      <Plus className="border border-sky-300 p-2 rounded-sm box-content" color="#0ea5e9" />
      <CardList />
    </div>
  )
}

export default App
