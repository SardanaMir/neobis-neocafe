import { useState } from 'react'
import LoginContainer from './pages/Login/LoginContainer'
import CodeVerification from './pages/CodeVerification'
import EditItem from './components/Modals/EditItem'
import DropDown from './components/DropDown'
import Menu from './pages/Menu'
import './App.css'
import AddNewItem from './components/Modals/AddNewItem'
import AddNewEmployee from './components/Modals/AddNewEmployee'
import AddNewCategory from './components/Modals/AddNewCategory'
import CategoriesPopUp from './components/PopUp/CategoriesPopUp'
// import AddCategoryModal from './components/Modals/AddCategoryModal'
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
