import { useState } from 'react'
import LoginContainer from './pages/Login/LoginContainer'
import CodeVerification from './pages/CodeVerification'
import Menu from './pages/Menu'
import './App.css'
import Header from './components/Header/Header'
import Affiliate from './components/Affiliate/Affiliate'
import AddAffiliateModal from './components/Modals/AddCategoryModal/AddAffiliateModal'
import Main from './pages/Main/Main'

function App() {

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Main />
    </div>
  )
}

export default App
