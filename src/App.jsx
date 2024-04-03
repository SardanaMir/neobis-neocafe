import { useState } from 'react'
import { Route, Router, Routes, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Layout } from 'antd'
import { ToastContainer } from 'react-toastify'
import Sider from './components/Sider/Sider';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import LoginPage from './pages/Login/LoginPage';
import PrivateRouter from './router/PrivateRouter';
import Menu from './pages/Menu';
import MainPage from './pages/Main/MainPage';
import CodeVerification from './pages/CodeVerification';
import LoginContainer from './pages/Login/LoginContainer';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {
  return (
      <div className='app'>
        <Routes>
          <Route element={<PrivateRouter />} >
            <Route path='/*' element={<MainPage />} />
          </Route>
          <Route path='/login' element={<LoginContainer />} />
        </Routes>
        <ToastContainer />
      </div>
  )
}

export default App;
