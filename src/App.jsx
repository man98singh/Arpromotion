import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CameraCapture from './whatsapp'
import SnapCameraLens from './snap'
import CameraComponent from './snap'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <CameraComponent />
    </>
  )
}

export default App
