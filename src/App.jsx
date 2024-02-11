import { useState } from 'react'
import LoginContainer from './pages/Login/LoginContainer'
import CodeVerification from './pages/CodeVerification'
import Menu from './pages/Menu'
import './App.css'
import Header from './components/Header/Header'
import Storehouse from './components/Storehouse/Storehouse'

function App() {

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Storehouse />
    </div>
  )
}

export default App
