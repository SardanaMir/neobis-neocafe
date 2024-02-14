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
import CategoriesPopUp from './components/PopUp/Categories'
// import AddCategoryModal from './components/Modals/AddCategoryModal'

function App() {

  return (
    <>
      <CategoriesPopUp/>
    </>
  )
}

export default App
