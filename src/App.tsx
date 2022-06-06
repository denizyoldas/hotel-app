import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import AddOtel from './pages/add-otel'
import Detail from './pages/detail'
import Main from './pages/main'
import './app.css'

function App() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransistionStage] = useState('fadeIn')

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage('fadeOut')
  }, [location])

  return (
    <div
      className={`${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === 'fadeOut') {
          setTransistionStage('fadeIn')
          setDisplayLocation(location)
        }
      }}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<Main />} />
        <Route path="/hotel/new" element={<AddOtel />} />
        <Route path="/hotel/:id" element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
